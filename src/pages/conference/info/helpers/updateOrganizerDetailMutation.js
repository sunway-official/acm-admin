import { gql } from 'react-apollo';

const UPDATE_ORGANIZER_DETAIL_MUTATION = gql`
  mutation updateOrganizerDetail(
    $id: ID!
    $user_id: ID!
    $name: String
    $email: String
    $website: String
    $phone: String
  ) {
    updateOrganizerDetail(
      id: $id
      user_id: $user_id
      name: $name
      email: $email
      website: $website
      phone: $phone
    ) {
      id
      user_id
      name
      email
      website
      phone
    }
  }
`;

export default UPDATE_ORGANIZER_DETAIL_MUTATION;
