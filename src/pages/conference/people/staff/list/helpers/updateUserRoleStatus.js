import { gql } from 'react-apollo';

const UPDATE_USER_ROLE_STATUS = gql`
  mutation updateUserRoleStatus(
    $user_id: ID!
    $role_id: ID!
    $status: Status!
    $conference_id: ID!
  ) {
    updateUserRoleStatus(
      user_id: $user_id
      role_id: $role_id
      status: $status
      conference_id: $conference_id
    ) {
      id
    }
  }
`;

export default UPDATE_USER_ROLE_STATUS;
