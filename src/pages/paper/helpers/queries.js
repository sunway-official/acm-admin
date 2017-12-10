import { gql } from 'react-apollo';

const GET_PAPERS_BY_CONFERENCE_ID = gql`
  query getPapersByConferenceID {
    getPapersByConferenceID {
      id
      title
      abstract
      keywords
      papersTopic {
        topic_id
      }
    }
  }
`;
const GET_TOPICS_BY_PAPER_ID = gql`
  query getTopicsByPaperID($paper_id: ID!) {
    getTopicsByPaperID(paper_id: $paper_id) {
      id
      topic {
        id
        name
      }
    }
  }
`;
const GET_TOPICS_OF_CONFERENCE = gql`
  query getTopicsOfConference {
    getTopicsOfConference {
      id
      name
    }
  }
`;
const GET_PAPER_BY_ID = gql`
  query getPaperByID($id: ID!) {
    getPaperByID(id: $id) {
      id
      title
      abstract
      keywords
    }
  }
`;

export const GET_ALL_PAPERS_BY_TOPIC_ID_QUERY = gql`
  query getAllPapersByTopicID($topic_id: ID!) {
    getAllPapersByTopicID(topic_id: $topic_id) {
      paper {
        id
        title
      }
    }
  }
`;

export default {
  GET_PAPERS_BY_CONFERENCE_ID,
  GET_TOPICS_BY_PAPER_ID,
  GET_TOPICS_OF_CONFERENCE,
  GET_PAPER_BY_ID,
  GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
};
