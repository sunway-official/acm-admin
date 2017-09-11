import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './CustomRoute';
import Home from '../pages/home/Home';
import NoMatch from '../pages/NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from '../theme';
export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Switch>
        <CustomRoute exact path="/" component={Home} />{' '}
        <Route component={NoMatch} />{' '}
      </Switch>{' '}
    </div>
  </MuiThemeProvider>
);
