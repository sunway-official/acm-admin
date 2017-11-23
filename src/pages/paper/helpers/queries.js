import { gql } from 'react-apollo';

const GET_ALL_PAPERS = gql`
  query getAllPapers {
    getAllPapers {
      title
    }
  }
`;

export default { GET_ALL_PAPERS };
