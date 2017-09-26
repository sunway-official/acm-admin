import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ConferenceInfo from '../pages/conference/info';
import ConferenceStaffList from '../pages/conference/people/staff/list';
import Dashboard from '../pages/dashboard';
import NoMatch from '../pages/NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../pages/Login';
import Register from '../pages/Register';
import WithThunk from '../pages/withThunk';
import AuthRoute from '../components/AuthRoute';

import { muiTheme } from '../theme';
import Wrapper from './wrapper';
export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Wrapper>
      <Switch>
        <AuthRoute needGuest path="/login" component={Login} />
        {''}
        <AuthRoute needGuest path="/register" component={Register} />
        {''}
        <Route exact path="/" component={Dashboard} />{' '}
        <Route path="/conference/info" component={ConferenceInfo} />
        <Route
          path="/conference/people/staff"
          component={ConferenceStaffList}
        />
        <Route path="/withThunk" component={WithThunk} />
        <Route component={NoMatch} />{' '}
      </Switch>{' '}
    </Wrapper>
  </MuiThemeProvider>
);
