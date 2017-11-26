import { gql } from 'react-apollo';

const DELETE_PAPER = gql`
  mutation deletePaper($id: ID!) {
    deletePaper(id: $id) {
      id
    }
  }
`;
const INSERT_PAPER = gql`
  mutation insertPaper($title: String!, $abstract: String!) {
    insertPaper(title: $title, abstract: $abstract) {
      id
    }
  }
`;
export default { DELETE_PAPER, INSERT_PAPER };
