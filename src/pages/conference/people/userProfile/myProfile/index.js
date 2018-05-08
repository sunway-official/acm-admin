import { IconButton, Subheader } from 'material-ui';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EditUserAvatar from '../changeAvatar/editUserAvatar';
import GeneralInfo from '../generalInfo';
import InfoTabs from './tab';

const MyProfile = ({ me }) => (
  <div className="conference">
    <Subheader className="subheader-user subheader">
      {localStorage.getItem('conferenceTitle')}
    </Subheader>
    <div className="page-breadcrumb d-flex">
      <Link className="d-flex" to="/">
        <IconButton>
          <ActionHome />
        </IconButton>
        <span>Dashboard</span>
      </Link>
      <IconButton>
        <HardwareKeyboardArrowRight />
      </IconButton>
      <span>User Profile</span>
    </div>
    <div className="dashboard content d-flex">
      <div className="contain">
        <div className="form-container">
          <div className="left-div">
            <div className="card" id="left-form-container">
              <EditUserAvatar avatar={me.avatar} />
              <GeneralInfo me={me} onSubmit="" />
            </div>
          </div>
          <div className="right-div">
            <div className="card" id="right-form-container">
              <div className="card-content">
                <InfoTabs me={me} disable={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default connect(mapStateToProps)(MyProfile);
