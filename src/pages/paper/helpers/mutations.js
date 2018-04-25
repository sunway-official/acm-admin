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
    $user_id: ID
    $corresponding: Int!
    $author_name: String
    $author_email: String
    $author_title: String
    $author_organization: String
    $author_street: String
    $author_city: String
    $author_country: String
    $author_zipcode: String
  ) {
    insertPaperAuthor(
      paper_id: $paper_id
      user_id: $user_id
      corresponding: $corresponding
      author_name: $author_name
      author_email: $author_email
      author_title: $author_title
      author_organization: $author_organization
      author_street: $author_street
      author_city: $author_city
      author_country: $author_country
      author_zipcode: $author_zipcode
    ) {
      id
    }
  }
`;

const UPDATE_PAPER = gql`
  mutation updatePaper(
    $id: ID!
    $paper_status_id: ID
    $title: String
    $abstract: String
    $keywords: String
    $file: String
  ) {
    updatePaper(
      paper_status_id: $paper_status_id
      title: $title
      abstract: $abstract
      keywords: $keywords
      file: $file
      id: $id
    ) {
      id
      papersTopic {
        topic_id
      }
    }
  }
`;

const UPDATE_PAPER_AUTHOR = gql`
  mutation updatePaperAuthor(
    $paper_id: ID!
    $user_id: ID
    $corresponding: Int!
    $author_name: String
    $author_email: String
    $author_title: String
    $author_organization: String
    $author_street: String
    $author_city: String
    $author_country: String
    $author_zipcode: String
  ) {
    updatePaperAuthor(
      paper_id: $paper_id
      user_id: $user_id
      corresponding: $corresponding
      author_name: $author_name
      author_email: $author_email
      author_title: $author_title
      author_organization: $author_organization
      author_street: $author_street
      author_city: $author_city
      author_country: $author_country
      author_zipcode: $author_zipcode
    ) {
      id
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

const INSERT_PAPER_REVIEWER = gql`
  mutation insertPaperReviewer($user_id: ID!, $paper_id: ID!) {
    insertPaperReviewer(user_id: $user_id, paper_id: $paper_id) {
      id
    }
  }
`;

const INSERT_PAPER_REVIEW_QUESTION = gql`
  mutation insertPaperReviewQuestion(
    $paper_id: ID!
    $review_question_id: ID!
    $point: Float!
    $comment: String
  ) {
    insertPaperReviewQuestion(
      paper_id: $paper_id
      review_question_id: $review_question_id
      point: $point
      comment: $comment
    ) {
      id
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
  INSERT_PAPER_REVIEWER,
  INSERT_PAPER_AUTHOR,
  INSERT_PAPER_REVIEW_QUESTION,
  UPDATE_PAPER_AUTHOR,
};
