import { gql } from 'react-apollo';

const UPDATE_CONFERENCE_MUTATION = gql`
  mutation updateConference(
    $id: ID!
    $title: String
    $description: String
    $start_date: Date
    $end_date: Date
  ) {
    updateConference(
      id: $id
      title: $title
      description: $description
      start_date: $start_date
      end_date: $end_date
    ) {
      id
      title
      description
      start_date
      end_date
      address {
        id
      }
    }
  }
`;

export default UPDATE_CONFERENCE_MUTATION;
