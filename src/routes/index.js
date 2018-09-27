import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import NotFound from './NotFound';

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "Dashboard" */ './Dashboard'),
  loading: () => null,
  modules: ['Dashboard']
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ './Login'),
  loading: () => null,
  modules: ['Login']
});

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);
