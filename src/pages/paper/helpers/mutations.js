import { gql } from 'react-apollo';

const DELETE_PAPER = gql`
  mutation deletePaper($id: ID!) {
    deletePaper(id: $id) {
      id
    }
  }
`;
const INSERT_PAPER = gql`
  mutation insertPaper($title: String!, $abstract: String!, $keywords: String) {
    insertPaper(title: $title, abstract: $abstract, keywords: $keywords) {
      id
    }
  }
`;

const INSERT_PAPER_TOPIC = gql`
  mutation insertPaperTopic($paper_id: ID!, $topic_id: ID!) {
    insertPaperTopic(paper_id: $paper_id, topic_id: $topic_id) {
      id
    }
  }
`;
const UPDATE_PAPER = gql`
  mutation updatePaper(
    $id: ID!
    $title: String
    $abstract: String
    $keywords: String
  ) {
    updatePaper(
      id: $id
      title: $title
      abstract: $abstract
      keywords: $keywords
    ) {
      id
    }
  }
`;
export default { DELETE_PAPER, INSERT_PAPER, INSERT_PAPER_TOPIC, UPDATE_PAPER };
