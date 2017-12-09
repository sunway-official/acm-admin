import { gql } from 'react-apollo';

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      id
    }
  }
`;
export const INSERT_CONFERENCE_ATTENDEE_MUTATION = gql`
  mutation insertConferenceAttendee($conference_id: ID!, $user_id: ID!) {
    insertConferenceAttendee(conference_id: $conference_id, user_id: $user_id) {
      id
    }
  }
`;
export const UPDATE_USER_ROLE_STATUS_MUTATION = gql`
  mutation updateUserRoleStatus(
    $role_id: ID!
    $user_id: ID!
    $conference_id: ID!
    $status: Status!
  ) {
    updateUserRoleStatus(
      role_id: $role_id
      user_id: $user_id
      conference_id: $conference_id
      status: $status
    ) {
      id
      user {
        id
      }
      role {
        id
      }
    }
  }
`;
export default {
  REGISTER_MUTATION,
  INSERT_CONFERENCE_ATTENDEE_MUTATION,
  UPDATE_USER_ROLE_STATUS_MUTATION,
};
