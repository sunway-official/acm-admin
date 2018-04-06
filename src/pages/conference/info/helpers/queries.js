import { gql } from 'react-apollo';

const GET_CURRENT_CONFERENCE = gql`
  query getCurrentConference {
    getCurrentConference {
      id
      title
      start_date
      end_date
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
      address {
        id
        lat
        long
      }
      organizerDetail {
        id
        name
        email
        address
        website
        phone
      }
      coOrganizerDetails {
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
  }
`;
const GET_CONFERENCE_BY_ID_QUERY = gql`
  query getConferenceByID($id: ID!) {
    getConferenceByID(id: $id) {
      id
      title
      description
      start_date
      end_date
      address {
        id
        lat
        long
      }
      organizerDetail {
        id
        name
        email
        website
        address
        phone
      }
      coOrganizerDetails {
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
  }
`;
const GET_CO_ORGANIZER_DETAIL_BY_ID = gql`
  query getCoOrganizerDetailByID($id: ID!) {
    getCoOrganizerDetailByID(id: $id) {
      id
      name
      email
      website
      phone
    }
  }
`;
const ME_QUERY = gql`
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
      linkedin_id
      facebook_id
      twitter_id
      position
      organization
      currentConference {
        id
        title
        description
        start_date
        end_date
        address {
          id
          lat
          long
        }
        organizerDetail {
          id
          name
          email
          website
          phone
          address
        }
      }
    }
  }
`;

export const GET_ALL_ROLE_OF_USER = gql`
  query getAllRolesOfUser {
    getAllRolesOfUser {
      role {
        id
      }
    }
  }
`;

export default {
  ME_QUERY,
  GET_CURRENT_CONFERENCE,
  GET_CONFERENCE_BY_ID_QUERY,
  GET_ALL_ROLE_OF_USER,
  GET_CO_ORGANIZER_DETAIL_BY_ID,
};
