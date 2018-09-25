import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../components/authenticated-route';
import UnauthenticatedRoute from '../components/unauthenticated-route';
import Loadable from 'react-loadable';

import NotFound from './not-found';

const Home = Loadable({
  loader: () => import('./home'),
  loading: () => null,
  modules: ['home']
});

const Search = Loadable({
  loader: () => import('./search'),
  loading: () => null,
  modules: ['search']
});

const Detail = Loadable({
  loader: () => import('./detail'),
  loading: () => null,
  modules: ['detail']
});

const Region = Loadable({
  loader: () => {
    return import('./region')
  },
  loading: () => null,
  modules: ['region']
});

const Building = Loadable({
  loader: () => {
    return import('./bldg')
  },
  loading: () => null,
  modules: ['building']
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ './login'),
  loading: () => null,
  modules: ['login']
});

const Logout = Loadable({
  loader: () => import(/* webpackChunkName: "logout" */ './logout'),
  loading: () => null,
  modules: ['logout']
});

const Faq = Loadable({
  loader: () => import(/* webpackChunkName: "faq" */ './faq'),
  loading: () => null,
  modules: ['faq']
});


export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/b/:id/:roomid" component={Detail} />

    <Route exact path='/b/:id' component={Building} />
    <Route exact path='/r/:id' component={Region} />

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />
    <Route exact path="/faq" component={Faq} />
    <Route exact path="/faq/:type" component={Faq} />
    <Route exact path="/faq/:type/:id" component={Faq} />

    <Route component={NotFound} />
  </Switch>
);
