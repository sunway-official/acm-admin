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
const GET_ALL_TOPICS = gql`
  query getAllTopics {
    getAllTopics {
      id
      name
    }
  }
`;
export default { GET_ALL_PAPERS, GET_TOPICS_BY_PAPER_ID, GET_ALL_TOPICS };
