import React from 'react';
import { Switch } from 'react-router-dom';
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
      <AuthRoute needGuest path="/register" component={Register} />
      <AuthRoute needGuest path="/forgot" component={Forgot} />
      <Wrapper>
        <Switch>
          <AuthRoute needAuth exact path="/" component={Dashboard} />
          <AuthRoute path="/conference/:id/info" component={ConferenceInfo} />
          <AuthRoute
            path="/conference/people/staff"
            component={ConferenceStaffList}
          />
          <AuthRoute exact path="/userInfo" component={UserInfo} />
          <AuthRoute exact path="/userProfile" component={UserProfile} />
          <AuthRoute path="/withThunk" component={WithThunk} />
          <AuthRoute component={NoMatch} />
        </Switch>
      </Wrapper>
    </Switch>
  </MuiThemeProvider>
);
