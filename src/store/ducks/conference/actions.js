import types from './types';

// GET CONFERENCE
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

// GET id
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
// GET POSITION
const getPositionRequested = () => ({
  type: types.GET_POSITION_REQUESTED,
});

const getPositionSuccess = position => ({
  type: types.GET_POSITION_SUCCESS,
  payload: {
    position,
  },
});

const getPositionFailure = () => ({
  type: types.GET_POSITION_FAILURE,
});

export default {
  getConferenceRequested,
  getConferenceSuccess,
  getConferenceFailure,
  getIdRequested,
  getIdSuccess,
  getIdFailure,
  getPositionRequested,
  getPositionSuccess,
  getPositionFailure,
};
