import { gql } from 'react-apollo';
export const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
  query getActivitiesByConferenceID {
    getActivitiesByConferenceID {
      id
      title
      description
      paper_id
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

export const GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY = gql`
  query getRoomsByStatusInConference($status: Status!) {
    getRoomsByStatusInConference(status: $status) {
      id
      name
    }
  }
`;

export const GET_ALL_PAPERS_BY_TOPIC_ID_QUERY = gql`
  query getAllPapersByTopicID($topic_id: ID!) {
    getAllPapersByTopicID(topic_id: $topic_id) {
      paper {
        id
        title
      }
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

export const GET_TOPICS_OF_CONFERENCE = gql`
  query getTopicsOfConference {
    getTopicsOfConference {
      id
      name
    }
  }
`;

export const GET_PAPER_BY_CONFERENCE_ID = gql`
  query getPapersByConferenceID {
    getPapersByConferenceID {
      id
      title
    }
  }
`;

export const GET_ACTIVITY_BY_ID_QUERY = gql`
  query getActivityByID($id: ID!) {
    getActivityByID(id: $id) {
      id
      paper_id
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
export const GET_ACTIVITY_PAPER_BY_ID_QUERY = gql`
  query getActivityByID($id: ID!) {
    getActivityByID(id: $id) {
      id
      paper_id
      paper {
        id
        papersTopic {
          topic {
            id
            name
          }
        }
      }
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

export default {
  GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
  GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY,
  GET_CONFERENCE_BY_ID,
  GET_ALL_ROLES,
  GET_PAPER_BY_CONFERENCE_ID,
  GET_TOPICS_OF_CONFERENCE,
  GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
  GET_ACTIVITY_BY_ID_QUERY,
  GET_ACTIVITY_PAPER_BY_ID_QUERY,
};
