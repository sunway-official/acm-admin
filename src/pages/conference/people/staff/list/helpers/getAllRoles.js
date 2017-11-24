import { gql } from 'react-apollo';

const GET_ALL_ROLES = gql`
  query getAllRoles {
    getAllRoles {
      id
      name
    }
  }
`;

export default GET_ALL_ROLES;
