import React, { Component } from 'react';
import InfoTabs from './tab';
import GeneralInfo from '../generalInfo';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';

export default class Index extends Component {
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader"> User Info</Subheader>
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
          <span>User Info</span>
        </div>
        <div className="dashboard content d-flex">
          <div className="contain">
            <div className="form-container">
              <GeneralInfo />
              <div className="right-div">
                <div className="card" id="right-form-container">
                  <div className="card-content">
                    <InfoTabs />
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
