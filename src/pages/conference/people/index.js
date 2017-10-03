import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import StaffList from './staff/list';
class Index extends Component {
  render() {
    const { loading } = this.props.data.getAllStaffInConference;
    if (loading) return <div>loading...</div>;
    const staff = this.props.data.get;
    console.log(staff);
    return <StaffList staff={staff} />;
  }
}

const GET_ALLSTAFF_IN_CONFERENCE = gql`
  query getAllStaffInConference($conference_id: ID!) {
    getAllStaffInConference(conference_id: $conference_id) {
      id
    firstname
    lastname
    permissions{role {
      id
      name
      }
    }
  }
`;

export default graphql(GET_ALLSTAFF_IN_CONFERENCE, {
  options: ownProps => ({ variables: { id: ownProps.match.params.id } }),
})(Index);
