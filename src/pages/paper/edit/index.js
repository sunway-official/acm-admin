import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import Form from './form';
class Index extends Component {
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
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
          <Link to="/conference/papers">
            <span>Papers List</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Paper Management</span>
        </div>
        <div className="dashboard content d-flex">
          <Form />
        </div>
      </div>
    );
  }
}
export default Index;
