import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './CustomRoute';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import Login from '../pages/Login/index';

export default () => (
  <div>
    <Switch>
      <CustomRoute exact path="/" component={Home} />
      <Route component={NoMatch} />
      <Route path="/login" component={Login} />
    </Switch>
  </div>
);
