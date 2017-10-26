import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import List from './list';
import { graphql, gql } from 'react-apollo';

class Index extends Component {
  render() {
    const { loading } = this.props.data;
    if (loading) return <div>Loading...</div>;

    const allStaff = this.props.data.getAllStaffInConference;
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
          <List allStaff={allStaff} />
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
    }
  }
`;
// export const GET_ALL_ROLES_BY_USER_ID = gql`
//   query getAllRolesByUserID($user_id: !ID) {
//     getAllRolesByUserID(user_id: $user_id) {
//       role {
//         name
//       }
//     }
//   }
// `;
export default graphql(GET_ALL_STAFF_IN_CONFERENCE, {
  options: ownProps => ({
    variables: { conference_id: ownProps.match.params.conference_id },
  }),
})(Index);
