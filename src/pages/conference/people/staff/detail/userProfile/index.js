import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import GeneralInfo from '../generalInfo';
import ProfileTabs from './tab';
import UserAvatar from '../changeAvatar/userAvatar';

export default class Index extends Component {
  render() {
    return (
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
          <span>People</span>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <Link className="d-flex" to="/conference/people/staff">
            <span>Staff</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Profile</span>
        </div>
        <div className="dashboard content d-flex">
          <div className="contain">
            <div className="form-container">
              <div className="left-div">
                <div className="card" id="left-form-container">
                  <div className="card-content">
                    <UserAvatar />
                    <GeneralInfo />
                  </div>
                </div>
              </div>
              <div className="right-div">
                <div className="card" id="right-form-container">
                  <div className="card-content">
                    <ProfileTabs />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
