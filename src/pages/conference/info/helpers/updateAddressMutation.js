import { gql } from 'react-apollo';

const UPDATE_ADDRESS_MUTATION = gql`
  mutation updateAddress($id: ID!, $lat: String!, $long: String!) {
    updateAddress(id: $id, lat: $lat, long: $long) {
      id
    }
  }
`;

export default UPDATE_ADDRESS_MUTATION;
