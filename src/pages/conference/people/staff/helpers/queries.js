import { gql } from 'react-apollo';

const GET_ALL_ROLES = gql`
  query getAllRoles {
    getAllRoles {
      id
      name
    }
  }
`;

const GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY = gql`
  query getAllRolesActiveByUserID($user_id: ID!, $conference_id: ID!) {
    getAllRolesActiveByUserID(
      user_id: $user_id
      conference_id: $conference_id
    ) {
      role {
        name
        id
      }
    }
  }
`;

const GET_ALL_STAFF_IN_CONFERENCE = gql`
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

export default {
  GET_ALL_ROLES,
  GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY,
  GET_ALL_STAFF_IN_CONFERENCE,
};
