import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';

class Index extends Component {
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader paper-title">
          {' '}
          Conference Information
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/conference/info">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Papers Management</span>
        </div>
        <div className="dashboard content d-flex" />
      </div>
    );
  }
}
export default Index;
