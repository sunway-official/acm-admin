import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ConferenceInfo from '../pages/conference/info';
import ConferenceStaffList from '../pages/conference/people/staff/list';
import Dashboard from '../pages/dashboard';
import NoMatch from '../pages/NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { muiTheme } from '../theme';
import Wrapper from './wrapper';
export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Wrapper>
      <Switch>
        <Route path="/login" component={Login} />
        {''}
        <Route path="/register" component={Register} />
        {''}
        <Route exact path="/" component={Dashboard} />{' '}
        <Route path="/conference/info" component={ConferenceInfo} />
        <Route
          path="/conference/people/staff"
          component={ConferenceStaffList}
        />
        <Route component={NoMatch} />{' '}
      </Switch>{' '}
    </Wrapper>
  </MuiThemeProvider>
);
