import { gql } from 'react-apollo';

export const GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY = gql`
  query getLandingPageByConferenceId {
    getLandingPageByConferenceId {
      id
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
  GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
  GET_ALL_ROLE_OF_USER,
};
