import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './CustomRoute';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';

export default () =>
  <div>
    <Switch>
      <CustomRoute exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </div>;
