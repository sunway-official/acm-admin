import { gql } from 'react-apollo';

const UPDATE_TOPIC_IN_CONFERENCE_MUTATION = gql`
  mutation updateTopicInConference(
    $id: ID!
    $name: String
    $description: String
    $color_id: ID
  ) {
    updateTopicInConference(
      id: $id
      name: $name
      description: $description
      color_id: $color_id
    ) {
      id
      name
      description
      color_code
    }
  }
`;
const INSERT_TOPIC_IN_CONFERENCE_MUTATION = gql`
  mutation insertTopicInConference(
    $name: String!
    $description: String!
    $color_id: ID!
  ) {
    insertTopicInConference(
      name: $name
      description: $description
      color_id: $color_id
    ) {
      id
      name
      description
      color_code
    }
  }
`;

const DELETE_TOPIC_MUTATION = gql`
  mutation deleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
    }
  }
`;

export default {
  UPDATE_TOPIC_IN_CONFERENCE_MUTATION,
  INSERT_TOPIC_IN_CONFERENCE_MUTATION,
  DELETE_TOPIC_MUTATION,
};
