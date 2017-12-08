import { gql } from 'react-apollo';

const UPDATE_ROOM_IN_CONFERENCE_MUTATION = gql`
  mutation updateRoomInConference(
    $id: ID!
    $name: String
    $seats: Int
    $status: Status
  ) {
    updateRoomInConference(
      id: $id
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
const INSERT_ROOM_IN_CONFERENCE_MUTATION = gql`
  mutation insertRoomInConference(
    $name: String!
    $seats: Int!
    $status: Status
  ) {
    insertRoomInConference(name: $name, seats: $seats, status: $status) {
      id
      name
      seats
      status
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
  UPDATE_ROOM_IN_CONFERENCE_MUTATION,
  INSERT_ROOM_IN_CONFERENCE_MUTATION,
  DELETE_ROOM_MUTATION,
};
