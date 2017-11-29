import { gql } from 'react-apollo';

const GET_ALL_PAPERS = gql`
  query getAllPapers {
    getAllPapers {
      id
      title
    }
  }
`;
const GET_TOPICS_BY_PAPER_ID = gql`
  query getTopicsByPaperID($paper_id: ID!) {
    getTopicsByPaperID(paper_id: $paper_id) {
      topic {
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
    }
  }
`;
export default {
  GET_ALL_PAPERS,
  GET_TOPICS_BY_PAPER_ID,
  GET_TOPICS_OF_CONFERENCE,
  GET_PAPER_BY_ID,
};
