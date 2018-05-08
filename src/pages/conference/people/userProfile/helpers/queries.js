import { gql } from 'react-apollo';

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
      linkedin_id
      facebook_id
      twitter_id
      position
      organization
    }
  }
`;

export const GET_USER_BY_ID_QUERY = gql`
  query getUserByID($userId: ID!) {
    getUserByID(userId: $userId) {
      id
      firstname
      lastname
      gender
      email
      bio
      dob
      linkedin_id
      facebook_id
      twitter_id
      position
      organization
      avatar
    }
  }
`;
export default {
  ME_QUERY,
  GET_USER_BY_ID_QUERY,
};
