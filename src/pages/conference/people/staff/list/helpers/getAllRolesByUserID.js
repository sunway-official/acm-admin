import { gql } from 'react-apollo';

const GET_ALL_ROLES_BY_USER_ID = gql`
  query getAllRolesByUserID($user_id: ID!) {
    getAllRolesByUserID(user_id: $user_id) {
      role {
        name
        id
        permissions {
          status
        }
      }
    }
  }
`;

export default GET_ALL_ROLES_BY_USER_ID;
