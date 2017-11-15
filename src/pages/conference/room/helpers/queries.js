import { gql } from 'react-apollo';

export const GET_ALL_ROOMS_QUERY = gql`
  query getAllRooms {
    getAllRooms {
      id
      name
      seats
      status
    }
  }
`;
export default {
  GET_ALL_ROOMS_QUERY,
};
