import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ConferenceInfo from '../pages/conference/info';
import ConferenceStaffList from '../pages/conference/people/staff/list';
import Dashboard from '../pages/dashboard';
import NoMatch from '../pages/NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import Forgot from '../pages/authentication/forgotPassword';
import WithThunk from '../pages/withThunk';
import AuthRoute from '../components/AuthRoute';

import { muiTheme } from '../theme';
import Wrapper from './wrapper';
import UserInfo from '../pages/conference/people/staff/detail/user-info';
import UserProfile from '../pages/conference/people/staff/detail/user-profile';

export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Switch>
      <AuthRoute needGuest path="/login" component={Login} />
      {''}
      <AuthRoute needGuest path="/register" component={Register} />
      {''}
      <AuthRoute needGuest path="/forgot" component={Forgot} />
      {''}
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Dashboard} />{' '}
          <Route path="/conference/info" component={ConferenceInfo} />
          <Route
            path="/conference/people/staff"
            component={ConferenceStaffList}
          />
          <Route exact path="/userInfo" component={UserInfo} />{' '}
          <Route exact path="/userProfile" component={UserProfile} />{' '}
          <Route path="/withThunk" component={WithThunk} />
          <Route component={NoMatch} />{' '}
        </Switch>{' '}
      </Wrapper>
    </Switch>
  </MuiThemeProvider>
);
