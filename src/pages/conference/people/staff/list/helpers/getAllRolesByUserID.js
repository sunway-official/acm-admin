import { gql } from 'react-apollo';

const GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY = gql`
  query getAllRolesActiveByUserID($user_id: ID!) {
    getAllRolesActiveByUserID(user_id: $user_id) {
      role {
        name
        id
      }
    }
  }
`;

export default GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY;
