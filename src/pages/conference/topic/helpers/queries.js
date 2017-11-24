import { gql } from 'react-apollo';

export const GET_TOPICS_OF_CONFERENCE_QUERY = gql`
  query getTopicsOfConference {
    getTopicsOfConference {
      id
      name
      description
      color_code
    }
  }
`;

export const GET_TOPIC_BY_ID_QUERY = gql`
  query getTopicByID($id: ID!) {
    getTopicByID(id: $id) {
      id
      name
      description
      color_code
      color {
        id
      }
    }
  }
`;

export const GET_ALL_COLORS_QUERY = gql`
  query getAllColors {
    getAllColors {
      id
      name
      code
    }
  }
`;

export default {
  GET_TOPICS_OF_CONFERENCE_QUERY,
  GET_TOPIC_BY_ID_QUERY,
  GET_ALL_COLORS_QUERY,
};
