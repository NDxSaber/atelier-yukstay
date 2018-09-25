// The basics
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import theme from '../styles/theme';
import ga from 'react-ga';
import config from './config';

// Action creators and helpers
import { establishCurrentUser } from "../modules/auth";
import { isServer } from "../store";

import Routes from "./routes";
import Footer from "./footer";

import "./app.css";
import "../styles";
import "font-awesome/css/font-awesome.min.css";

class App extends Component {
  componentWillMount() {
    if (!isServer) {
      this.props.establishCurrentUser();

      ga.initialize(config.google.ANALYTICS_TRACKING_CODE, { debug: false });
      ga.pageview(this.props.location.pathname + this.props.location.search);
    }
  }

  componentWillUpdate(nextProps) {
    if (!isServer) {
      if (nextProps.location.pathname !== this.props.location.pathname ||
        nextProps.location.search !== this.props.location.search) {
        ga.pageview(nextProps.location.pathname + nextProps.location.search);
      }
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Routes/>
          <Footer/>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ establishCurrentUser }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
