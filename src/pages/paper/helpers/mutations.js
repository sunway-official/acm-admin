import { gql } from 'react-apollo';

const DELETE_PAPER = gql`
  mutation deletePaper($id: ID!) {
    deletePaper(id: $id) {
      id
    }
  }
`;
const INSERT_PAPER = gql`
  mutation insertPaper(
    $paper_status_id: ID!
    $title: String!
    $abstract: String!
    $keywords: String
    $file: String!
  ) {
    insertPaper(
      paper_status_id: $paper_status_id
      title: $title
      abstract: $abstract
      keywords: $keywords
      file: $file
    ) {
      id
      papersTopic {
        topic_id
      }
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

const DELETE_PAPER_TOPIC = gql`
  mutation deletePaperTopic($paper_id: ID!, $topic_id: ID!) {
    deletePaperTopic(paper_id: $paper_id, topic_id: $topic_id) {
      topic_id
    }
  }
`;
const INSERT_PAPER_AUTHOR = gql`
  mutation insertPaperAuthor(
    $paper_id: ID!
    $user_id: ID!
    $topic_id: ID!
    $corresponding: Int!
    $author_name: string
    $author_email: String
    $author_title: String
    $author_organizer: String
    $author_country: String
    $paper_status: String
  ) {
    insertPaperAuthor(
      paper_id: $paper_id
      user_id: $user_id
      topic_id: $topic_id
      corresponding: $corresponding
      author_name: $author_name
      author_email: $author_email
      author_title: $author_title
      author_organizer: $author_organizer
      author_country: $author_country
      paper_status: $paper_status
    ) {
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
      papersTopic {
        topic_id
      }
    }
  }
`;
const UPDATE_TOPIC_OF_PAPER = gql`
  mutation updateTopicOfPaper($paper_id: ID!, $topic_id: ID!) {
    updateTopicOfPaper(paper_id: $paper_id, topic_id: $topic_id) {
      id
      topic_name
    }
  }
`;

export default {
  DELETE_PAPER,
  INSERT_PAPER,
  INSERT_PAPER_TOPIC,
  UPDATE_PAPER,
  DELETE_PAPER_TOPIC,
  UPDATE_TOPIC_OF_PAPER,
  INSERT_PAPER_AUTHOR,
};
