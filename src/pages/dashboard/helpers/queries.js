import { gql } from 'react-apollo';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      firstname
      lastname
      gender
      email
      bio
      dob
      avatar
      linkedin_id
      facebook_id
      twitter_id
      position
      organization
      currentConference {
        id
        title
        description
        start_date
        end_date
        category_id
        category_name
        address {
          id
          lat
          long
        }
        organizerDetail {
          id
          name
          email
          website
          phone
        }
      }
    }
  }
`;

export const GET_ALL_CONFERENCES_BY_USER_ID_QUERY = gql`
  query getAllConferencesByUserID {
    getAllConferencesByUserID {
      conference {
        id
        title
        description
        start_date
        end_date
        category_id
        category_name
        address {
          id
          city
        }
        organizerDetail {
          id
          name
          email
          address
          website
          phone
          user {
            id
            lastname
          }
        }
      }
    }
  }
`;
export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
      conferences {
        id
        title
        start_date
        end_date
      }
    }
  }
`;
export default {
  ME_QUERY,
  GET_ALL_CONFERENCES_BY_USER_ID_QUERY,
  GET_ALL_CATEGORIES,
};
