import { gql } from 'react-apollo';

const UPDATE_ROOM_MUTATION = gql`
  mutation updateRoom(
    $id: ID!
    $conference_id: ID!
    $name: String
    $seats: Int
    $status: Status
  ) {
    updateRoom(
      id: $id
      conference_id: $conference_id
      name: $name
      seats: $seats
      status: $status
    ) {
      id
      name
      seats
      status
    }
  }
`;
const INSERT_ROOM_MUTATION = gql`
  mutation insertRoom(
    $conference_id: ID!
    $name: String!
    $seats: Int!
    $status: Status
  ) {
    insertRoom(
      conference_id: $conference_id
      name: $name
      seats: $seats
      status: $status
    ) {
      id
      name
      seats
      status
      conference {
        id
      }
    }
  }
`;

const DELETE_ROOM_MUTATION = gql`
  mutation deleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

export default {
  UPDATE_ROOM_MUTATION,
  INSERT_ROOM_MUTATION,
  DELETE_ROOM_MUTATION,
};
