import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Subheader, IconButton } from 'material-ui';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';

import GeneralInfo from '../generalInfo';
import EditUserAvatar from '../changeAvatar/editUserAvatar';

import InfoTabs from './tab';

const UserProfile = ({ me }) => (
  <div className="conference">
    <Subheader className="subheader"> User Profile</Subheader>
    <div className="page-breadcrumb d-flex">
      <Link className="d-flex" to="/">
        <IconButton>
          <ActionHome />
        </IconButton>
        <span>Home</span>
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
              <div className="card-content">
                <EditUserAvatar />
                <GeneralInfo me={me} />
              </div>
            </div>
          </div>
          <div className="right-div">
            <div className="card" id="right-form-container">
              <div className="card-content">
                <InfoTabs me={me} />
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

export default connect(mapStateToProps)(UserProfile);