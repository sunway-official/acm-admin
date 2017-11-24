import { gql } from 'react-apollo';

const UPDATE_TOPIC_MUTATION = gql`
  mutation updateTopic(
    $id: ID!
    $name: String
    $description: String
    $color_id: ID
  ) {
    updateTopic(
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
const INSERT_TOPIC_MUTATION = gql`
  mutation insertTopic($name: String!, $description: String!, $color_id: ID!) {
    insertTopic(name: $name, description: $description, color_id: $color_id) {
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
  UPDATE_TOPIC_MUTATION,
  INSERT_TOPIC_MUTATION,
  DELETE_TOPIC_MUTATION,
};
