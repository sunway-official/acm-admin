import { gql } from 'react-apollo';

const GET_CURRENT_CONFERENCE = gql`
  query getCurrentConference {
    getCurrentConference {
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

export const ME_QUERY = gql`
  query Me {
    me {
      id
      currentConference {
        id
      }
    }
  }
`;
export default { ME_QUERY, GET_CURRENT_CONFERENCE, GET_CONFERENCE_BY_ID_QUERY };
