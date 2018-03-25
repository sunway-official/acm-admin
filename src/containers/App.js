import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from '../components/AuthRoute';
import ForgotPassword from '../pages/authentication/forgotPassword';
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import ResetPassword from '../pages/authentication/resetPassword';
import ConferenceInfo from '../pages/conference/info';
import Paper from '../pages/paper';
import PaperAdd from '../pages/paper/add';
import PaperEdit from '../pages/paper/edit';
import ConferenceStaffList from '../pages/conference/people/staff';
import UserProfile from '../pages/conference/people/userProfile/userProfile';
import Dashboard from '../pages/dashboard';
import NoMatch from '../pages/NoMatch';
import Schedule from '../pages/schedule';
import WithThunk from '../pages/withThunk';

import { muiTheme } from '../theme';
import Wrapper from './wrapper';
import LandingPage from '../pages/landingPage';
import LandingPageManagement from '../pages/conference/landingPageManagement';
import LandingPageSchedule from '../pages/landingPage/schedule/index';
import RoomsManagement from '../pages/conference/room';
import TopicManagement from '../pages/conference/topic';
import TopicDetail from '../pages/conference/topic/topicDetail';
import RoomDetail from '../pages/conference/room/roomDetail';
import AddNewRoom from '../pages/conference/room/roomDetail/addRoom';
import AddNewTopic from '../pages/conference/topic/topicDetail/addTopic';
import Addconference from '../pages/dashboard/renderDashboard/addConference';
import ParticipantManagement from '../pages/conference/people/participant';
import AddActivityPaper from '../pages/schedule/addActivity/addActivityPaper';
import AddActivityTitle from '../pages/schedule/addActivity/addActivityTitle';
import EditActivityPaper from '../pages/schedule/editActivity/editAcitvityPaper';
import EditActivityTitle from '../pages/schedule/editActivity/editAcitvityTitle';
import AddCoOrganizer from '../pages/conference/info/coOrganizer/add';
import EditCoOrganizer from '../pages/conference/info/coOrganizer/edit';
import UploadFile from '../pages/uploadFile';

export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Switch>
      <AuthRoute
        path="/landingpage/:conference_id/schedule"
        component={LandingPageSchedule}
      />
      <AuthRoute path="/landingpage/:conference_id" component={LandingPage} />
      <AuthRoute needGuest path="/login" component={Login} />
      <AuthRoute needGuest path="/register" component={Register} />
      <AuthRoute needGuest path="/forgot" component={ForgotPassword} />
      <AuthRoute needGuest path="/resetPassword" component={ResetPassword} />
      <Wrapper>
        <Switch>
          <AuthRoute needAuth exact path="/" component={Dashboard} />
          <AuthRoute path="/conference/info" component={ConferenceInfo} />
          <AuthRoute path="/upload" component={UploadFile} />
          <AuthRoute path="/conference/add" component={Addconference} />
          <AuthRoute
            path="/conference/add-co-organizer"
            component={AddCoOrganizer}
          />
          <AuthRoute
            path="/conference/edit-co-organizer/:id"
            component={EditCoOrganizer}
          />
          <AuthRoute
            path="/conference/people/staff"
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
            path="/conference/topics-management"
            component={TopicManagement}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/topics-management/topic-detail/"
            component={AddNewTopic}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/topics-management/topic-detail/:topic_id"
            component={TopicDetail}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/rooms-management/room-detail/:room_id"
            component={RoomDetail}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/rooms-management/room-detail"
            component={AddNewRoom}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/people/participant-management"
            component={ParticipantManagement}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/papers"
            component={Paper}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/paper/add"
            component={PaperAdd}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/paper/edit/:id"
            component={PaperEdit}
          />
          <AuthRoute
            needAuth
            exact
            path="/user-profile"
            component={UserProfile}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/activities/add-activity-paper"
            component={AddActivityPaper}
          />

          <AuthRoute
            needAuth
            exact
            path="/conference/activities/add-activity-title"
            component={AddActivityTitle}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/activities/edit-activity-paper/:id"
            component={EditActivityPaper}
          />
          <AuthRoute
            needAuth
            exact
            path="/conference/activities/edit-activity-title/:id"
            component={EditActivityTitle}
          />

          <AuthRoute exact path="/conference/activities" component={Schedule} />
          <AuthRoute path="/withThunk" component={WithThunk} />
          <AuthRoute component={NoMatch} />
        </Switch>
      </Wrapper>
    </Switch>
  </MuiThemeProvider>
);
