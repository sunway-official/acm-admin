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

export default GET_CURRENT_CONFERENCE;
