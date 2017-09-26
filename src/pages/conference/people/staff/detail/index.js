import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import UserProfile from './details';

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
          <span>Detail</span>
        </div>
        <div className="dashboard content d-flex">
          <UserProfile />
        </div>
      </div>
    );
  }
}
