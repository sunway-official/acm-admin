import { gql } from 'react-apollo';
export const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
  query getActivitiesByConferenceID {
    getActivitiesByConferenceID {
      id
      title
      description
      conference {
        start_date
        end_date
      }
      schedules {
        id
        start
        end
        room {
          id
          name
        }
      }
    }
  }
`;

export const GET_CONFERENCE_BY_ID = gql`
  query getConferenceByID($id: ID!) {
    getConferenceByID(id: $id) {
      id
      start_date
      end_date
    }
  }
`;

export const GET_ROOMS_BY_STATUS_QUERY = gql`
  query getRoomsByStatus($status: Status!) {
    getRoomsByStatus(status: $status) {
      id
      name
    }
  }
`;

export const GET_ALL_ROLES = gql`
  query getAllRoles {
    getAllRoles {
      id
      name
    }
  }
`;

export default {
  GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
  GET_ROOMS_BY_STATUS_QUERY,
  GET_CONFERENCE_BY_ID,
  GET_ALL_ROLES,
};
