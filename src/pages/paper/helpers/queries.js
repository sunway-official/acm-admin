import { gql } from 'react-apollo';

const GET_PAPERS_WITH_AUTHOR_BY_CONFERENCE_ID = gql`
  query getPapersWithAuthorByConferenceID {
    getPapersWithAuthorByConferenceID {
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
const GET_PAPERS_BY_CONFERENCE_ID = gql`
  query getPapersByConferenceID($role_id: ID!) {
    getPapersByConferenceID(role_id: $role_id) {
      id
      title
      reviewers {
        reviewer_name
      }
      authors {
        author_name
      }
      topic_name
      status
      comments {
        id
        point
        reviewer_name
        review_question_id
        content
        comment
      }
    }
  }
`;

const GET_PAPERS_BY_USER_ID = gql`
  query getPapersByUserID {
    getPapersByUserID {
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
      conference {
        id
        dl_review_abstract
        dl_re_review_abstract
        dl_review_paper
        dl_re_review_paper
      }
      topic_name
      authors {
        id
        author_name
        author_title
        corresponding
      }
      status
      title
      abstract
      reviewers {
        id
        reviewer_name
      }
      comments {
        id
        point
        reviewer_name
        review_question_id
        content
        comment
      }
      keywords
      file
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

export const GET_ALL_USERS_BY_ROLE_ID_QUERY = gql`
  query getAllUsersByRoleID($role_id: ID!) {
    getAllUsersByRoleID(role_id: $role_id) {
      user {
        id
        firstname
        lastname
      }
    }
  }
`;
export const ME_QUERY = gql`
  query Me {
    me {
      id
      firstname
      lastname
      gender
      email
      bio
      dob
      avatar
      position
      organization
      address {
        id
        street
        city
        country
      }
    }
  }
`;

export default {
  GET_PAPERS_BY_CONFERENCE_ID,
  GET_PAPERS_BY_USER_ID,
  GET_TOPICS_BY_PAPER_ID,
  GET_TOPICS_OF_CONFERENCE,
  GET_PAPER_BY_ID,
  GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
  GET_PAPERS_WITH_AUTHOR_BY_CONFERENCE_ID,
  GET_ALL_USERS_BY_ROLE_ID_QUERY,
  ME_QUERY,
};
