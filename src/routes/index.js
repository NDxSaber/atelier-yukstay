import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import NotFound from './NotFound';

// const Dashboard = Loadable({
//   loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard'),
//   loading: () => null,
//   modules: ['dashboard']
// });

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ './Login'),
  loading: () => null,
  modules: ['Login']
});

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    {/* <AuthenticatedRoute exact path="/dashboard" component={Dashboard} /> */}

    <Route component={NotFound} />
  </Switch>
);
