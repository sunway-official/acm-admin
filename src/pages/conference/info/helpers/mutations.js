import { gql } from 'react-apollo';

const UPDATE_ADDRESS_MUTATION = gql`
  mutation updateAddress($id: ID!, $lat: String!, $long: String!) {
    updateAddress(id: $id, lat: $lat, long: $long) {
      id
    }
  }
`;
const UPDATE_CONFERENCE_MUTATION = gql`
  mutation updateConference(
    $id: ID!
    $title: String
    $description: String
    $start_date: Date
    $end_date: Date
    $dl_submit_abstract: Date
    $dl_review_abstract: Date
    $dl_release_abstract: Date
    $dl_re_submit_abstract: Date
    $dl_re_review_abstract: Date
    $dl_release_final_abstract: Date
    $dl_submit_paper: Date
    $dl_review_paper: Date
    $dl_release_paper: Date
    $dl_re_submit_paper: Date
    $dl_re_review_paper: Date
    $dl_release_final_paper: Date
    $dl_registration: Date
  ) {
    updateConference(
      id: $id
      title: $title
      description: $description
      start_date: $start_date
      end_date: $end_date
      dl_submit_abstract: $dl_submit_abstract
      dl_review_abstract: $dl_review_abstract
      dl_release_abstract: $dl_release_abstract
      dl_re_submit_abstract: $dl_re_submit_abstract
      dl_re_review_abstract: $dl_re_review_abstract
      dl_release_final_abstract: $dl_release_final_abstract
      dl_submit_paper: $dl_submit_paper
      dl_review_paper: $dl_review_paper
      dl_release_paper: $dl_release_paper
      dl_re_submit_paper: $dl_re_submit_paper
      dl_re_review_paper: $dl_re_review_paper
      dl_release_final_paper: $dl_release_final_paper
      dl_registration: $dl_registration
    ) {
      id
      title
      description
      start_date
      end_date
      address {
        id
      }
      dl_submit_abstract
      dl_review_abstract
      dl_release_abstract
      dl_re_submit_abstract
      dl_re_review_abstract
      dl_release_final_abstract
      dl_submit_paper
      dl_review_paper
      dl_release_paper
      dl_re_submit_paper
      dl_re_review_paper
      dl_release_final_paper
      dl_registration
    }
  }
`;
const UPDATE_ORGANIZER_DETAIL_MUTATION = gql`
  mutation updateOrganizerDetail(
    $id: ID!
    $name: String
    $email: String
    $website: String
    $phone: String
    $address: String
  ) {
    updateOrganizerDetail(
      id: $id
      name: $name
      email: $email
      website: $website
      phone: $phone
      address: $address
    ) {
      id
      name
      email
      website
      phone
      address
    }
  }
`;

const UPDATE_COORGANIZER_MUTATION = gql`
  mutation updateCoOrganizerDetail(
    $id: ID!
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
  ) {
    updateCoOrganizerDetail(
      id: $id
      name: $name
      email: $email
      website: $website
      phone: $phone
    ) {
      id
      name
      email
      website
      phone
    }
  }
`;

const INSERT_COORGANIZER = gql`
  mutation insertCoOrganizerDetail(
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
    $address: String!
  ) {
    insertCoOrganizerDetail(
      name: $name
      email: $email
      website: $website
      phone: $phone
      address: $address
    ) {
      id
      name
      email
      website
      phone
      conference {
        id
      }
    }
  }
`;

const DELETE_COORGANIZER = gql`
  mutation deleteCoOrganizerDetail($id: ID!) {
    deleteCoOrganizerDetail(id: $id) {
      id
      name
      email
      website
      phone
      conference {
        id
      }
    }
  }
`;

const UPDATE_ALL_STATUS_PAPERS = gql`
  mutation updateAllStatusPapers($current_date: Date!) {
    updateAllStatusPapers(current_date: $current_date) {
      status
    }
  }
`;

export default {
  UPDATE_ADDRESS_MUTATION,
  UPDATE_CONFERENCE_MUTATION,
  UPDATE_ORGANIZER_DETAIL_MUTATION,
  INSERT_COORGANIZER,
  UPDATE_COORGANIZER_MUTATION,
  DELETE_COORGANIZER,
  UPDATE_ALL_STATUS_PAPERS,
};
