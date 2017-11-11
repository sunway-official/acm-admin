import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import List from './list';
import { graphql, gql, compose } from 'react-apollo';

class Index extends Component {
  render() {
    const { loading } = this.props.data;
    if (loading) return <div>Loading...</div>;

    const staffs = this.props.data.getAllStaffInConference;
    return (
      <div className="conference">
        <Subheader className="subheader"> Staff List</Subheader>
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
          <span>Staff</span>
        </div>
        <div className="dashboard content d-flex">
          <List
            staffs={staffs}
            conference_id={this.props.match.params.conference_id}
          />
        </div>
      </div>
    );
  }
}

export const GET_ALL_STAFF_IN_CONFERENCE = gql`
  query getAllStaffInConference($conference_id: ID!) {
    getAllStaffInConference(conference_id: $conference_id) {
      id
      firstname
      lastname
      email
      dob
      gender
    }
  }
`;

export default compose(
  graphql(GET_ALL_STAFF_IN_CONFERENCE, {
    options: ownProps => ({
      variables: { conference_id: ownProps.match.params.conference_id },
    }),
  }),
)(Index);
