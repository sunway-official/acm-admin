import { gql } from 'react-apollo';

const INVITE_USER = gql`
  mutation inviteUser(
    $role_id: ID!
    $email: String!
    $title: String!
    $firstname: String!
    $lastname: String!
  ) {
    inviteUser(
      role_id: $role_id
      email: $email
      title: $title
      firstname: $firstname
      lastname: $lastname
    ) {
      id
    }
  }
`;

export default {
  INVITE_USER,
};
