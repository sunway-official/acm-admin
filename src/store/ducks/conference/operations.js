import actions from './actions';

const getConferenceOperation = conference => async dispatch => {
  dispatch(actions.getConferenceRequested());
  try {
    return dispatch(actions.getConferenceSuccess(conference));
  } catch (e) {
    console.log(e);
    return dispatch(actions.getConferenceFailure());
  }
};
const getIdOperation = id => async dispatch => {
  dispatch(actions.getIdRequested());
  try {
    return dispatch(actions.getIdSuccess(id));
  } catch (e) {
    console.log(e);
    return dispatch(actions.getIdFailure());
  }
};

export default {
  getConferenceOperation,
  getIdOperation,
};
