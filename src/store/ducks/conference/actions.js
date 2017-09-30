import types from './types';

const getConferenceRequested = () => ({
  type: types.GET_CONFERENCE_REQUESTED,
});

const getConferenceSuccess = conference => ({
  type: types.GET_CONFERENCE_SUCCESS,
  payload: {
    conference,
  },
});

const getConferenceFailure = () => ({
  type: types.GET_CONFERENCE_FAILURE,
});

const getIdRequested = () => ({
  type: types.GET_ID_REQUESTED,
});

const getIdSuccess = id => ({
  type: types.GET_ID_SUCCESS,
  payload: {
    id,
  },
});

const getIdFailure = () => ({
  type: types.GET_ID_FAILURE,
});

export default {
  getConferenceRequested,
  getConferenceSuccess,
  getConferenceFailure,
  getIdRequested,
  getIdSuccess,
  getIdFailure,
};
