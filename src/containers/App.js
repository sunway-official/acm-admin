import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from '../components/AuthRoute';
import Forgot from '../pages/authentication/forgotPassword';
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import ConferenceInfo from '../pages/conference/info';
import UserInfo from '../pages/conference/people/staff/detail/userInfo';
import UserProfile from '../pages/conference/people/userProfile/userProfile';
import ConferenceStaffList from '../pages/conference/people/staff/list';
import Dashboard from '../pages/dashboard';
import NoMatch from '../pages/NoMatch';
import Schedule from '../pages/schedule';
import WithThunk from '../pages/withThunk';
import { muiTheme } from '../theme';
import Wrapper from './wrapper';

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
            path="/conference/:conference_id/people/staff"
            component={ConferenceStaffList}
          />
          <AuthRoute exact path="/user-profile" component={UserProfile} />
          <AuthRoute
            exact
            path="/conference/:id/schedules"
            component={Schedule}
          />
          <AuthRoute exact path="/userInfo" component={UserInfo} />
          <AuthRoute path="/withThunk" component={WithThunk} />
          <AuthRoute component={NoMatch} />
        </Switch>
      </Wrapper>
    </Switch>
  </MuiThemeProvider>
);
