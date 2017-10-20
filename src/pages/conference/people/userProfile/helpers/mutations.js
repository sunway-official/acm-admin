import { gql } from 'react-apollo';

const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe(
    $firstname: String
    $lastname: String
    $dob: Date
    $gender: Gender
    $bio: String
    $organization: String
    $position: String
    $linkedin_id: String
    $facebook_id: String
    $twitter_id: String
  ) {
    updateMe(
      firstname: $firstname
      lastname: $lastname
      dob: $dob
      gender: $gender
      bio: $bio
      position: $position
      organization: $organization
      linkedin_id: $linkedin_id
      facebook_id: $facebook_id
      twitter_id: $twitter_id
    ) {
      firstname
      lastname
      dob
      gender
      bio
      position
      organization
      linkedin_id
      facebook_id
      twitter_id
    }
  }
`;

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($oldPassword: String, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`;

export default {
  UPDATE_ME_MUTATION,
  UPDATE_PASSWORD_MUTATION,
};
