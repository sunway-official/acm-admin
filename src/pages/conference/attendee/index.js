import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql } from 'react-apollo';
import { queries } from './helpers';

class Index extends Component {
  render() {
    const { loading, getAllConferenceAttendees } = this.props.data;
    if (loading) return <div>loading...</div>;
    console.log(getAllConferenceAttendees);
    return (
      <div className="conference">
        <Subheader className="subheader"> Attendees Management</Subheader>
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
          <span>Attendees Management</span>
        </div>
        <div className="dashboard content d-flex" />
      </div>
    );
  }
}

export default graphql(queries.GET_ALL_CONFERENCE_ATTENDEES, {})(Index);
