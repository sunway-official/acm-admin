import { gql } from 'react-apollo';

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

export default GET_CONFERENCE_BY_ID_QUERY;
