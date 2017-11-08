import { gql } from 'react-apollo';

const GET_ALL_STAFF_IN_CONFERENCE = gql`
  query getAllStaffInConference($conference_id: ID!) {
    getAllStaffInConference(conference_id: $conference_id) {
      id
      firstname
      lastname
      email
      dob
      gender
    }
  }
`;

export default GET_ALL_STAFF_IN_CONFERENCE;
