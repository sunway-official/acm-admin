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
export default {
  ME_QUERY,
};
