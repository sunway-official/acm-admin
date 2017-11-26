import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import List from './list';
class Index extends Component {
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader">Papers Management</Subheader>
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
          <span>Papers List</span>
        </div>
        <div className="dashboard content d-flex">
          <List />
        </div>
      </div>
    );
  }
}

export default Index;
