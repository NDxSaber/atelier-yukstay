import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
