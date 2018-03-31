import actions from './actions';

// GET CONFERENCE
const getConferenceOperation = conference => async dispatch => {
  dispatch(actions.getConferenceRequested());
  try {
    return dispatch(actions.getConferenceSuccess(conference));
  } catch (e) {
    console.log(e);
    return dispatch(actions.getConferenceFailure());
  }
};

// GET ID
const getIdOperation = id => async dispatch => {
  dispatch(actions.getIdRequested());
  try {
    return dispatch(actions.getIdSuccess(id));
  } catch (e) {
    console.log(e);
    return dispatch(actions.getIdFailure());
  }
};

// GET POSITION
const getPositionOperation = position => async dispatch => {
  dispatch(actions.getPositionRequested());
  try {
    return dispatch(actions.getPositionSuccess(position));
  } catch (e) {
    console.log(e);
    return dispatch(actions.getPositionFailure());
  }
};

export default {
  getConferenceOperation,
  getIdOperation,
  getPositionOperation,
};
