import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from '../components/AuthRoute';
import ForgotPassword from '../pages/authentication/forgotPassword';
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import ResetPassword from '../pages/authentication/resetPassword';
import ConferenceInfo from '../pages/conference/info';
import ConferenceStaffList from '../pages/conference/people/staff/list';
import UserProfile from '../pages/conference/people/userProfile/userProfile';
import Dashboard from '../pages/dashboard';
import NoMatch from '../pages/NoMatch';
import Schedule from '../pages/schedule';
import WithThunk from '../pages/withThunk';
import { muiTheme } from '../theme';
import Wrapper from './wrapper';
import LandingPage from '../landingPage';
import LandingPageManagement from '../pages/landingPageManagement';
import LandingPageSchedule from '../landingPage/schedule/index';
import RoomsManagement from '../pages/conference/room';

export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Switch>
      <AuthRoute path="/landingpage/schedule" component={LandingPageSchedule} />
      <AuthRoute path="/landingpage" component={LandingPage} />
      <AuthRoute needGuest path="/login" component={Login} />
      <AuthRoute needGuest path="/register" component={Register} />
      <AuthRoute needGuest path="/forgot" component={ForgotPassword} />
      <AuthRoute needGuest path="/resetPassword" component={ResetPassword} />
      <Wrapper>
        <Switch>
          <AuthRoute needAuth exact path="/" component={Dashboard} />
          <AuthRoute path="/conference/:id/info" component={ConferenceInfo} />
          <AuthRoute
            path="/conference/:conference_id/people/staff"
            component={ConferenceStaffList}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/landing-page-management"
            component={LandingPageManagement}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/rooms-management"
            component={RoomsManagement}
          />
          <AuthRoute
            needAuth
            exact
            path="/user-profile"
            component={UserProfile}
          />
          <AuthRoute
            exact
            path="/conference/:id/schedules"
            component={Schedule}
          />
          <AuthRoute path="/withThunk" component={WithThunk} />
          <AuthRoute component={NoMatch} />
        </Switch>
      </Wrapper>
    </Switch>
  </MuiThemeProvider>
);
