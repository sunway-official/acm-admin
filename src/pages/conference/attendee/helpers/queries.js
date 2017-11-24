import { gql } from 'react-apollo';

export const GET_ALL_CONFERENCE_ATTENDEES = gql`
  query getAllConferenceAttendees {
    getAllConferenceAttendees {
      id
      user {
        id
        firstname
        lastname
        email
        gender
        dob
        phone_number
        bio
        position
        organization
      }
    }
  }
`;
export default {
  GET_ALL_CONFERENCE_ATTENDEES,
};
