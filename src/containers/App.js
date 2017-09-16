import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './CustomRoute';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import Login from '../pages/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default () => (
  <MuiThemeProvider>
    <div>
      <Switch>
        <CustomRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </MuiThemeProvider>
);
