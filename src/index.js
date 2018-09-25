import React from "react";
import { Component } from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import { Frontload } from "react-frontload";
import { withRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import createStore from "./store";

import App from "./app/app";
import "./index.css";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

let Scroller = withRouter(ScrollToTop);

// Create a store and get back itself and its history object
const { store, history } = createStore();

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here
const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Scroller>
        <Frontload noServerRender>
          <App/>
        </Frontload>
      </Scroller>
    </ConnectedRouter>
  </Provider>
);

const root = document.querySelector("#root");

if (process.env.NODE_ENV === "production") {
  // If we're running in production, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  // If we're not running on the server, just render like normal
  render(Application, root);
}
