import actions from './actions';

const setEventOperation = event => async dispatch => {
  dispatch(actions.setEventRequested());
  try {
    return dispatch(actions.setEventSuccess(event));
  } catch (e) {
    console.log(e);
    return dispatch(actions.setEventFailure());
  }
};

// delete schedule with id when click buttuon delete in add, edit activity
const deleteScheduleIdsOperation = deleteIds => async dispatch => {
  dispatch(actions.deleteScheduleIdsRequested());
  try {
    return dispatch(actions.deleteScheduleIdsSuccess(deleteIds));
  } catch (e) {
    console.log(e);
    return dispatch(actions.deleteScheduleIdsFailure());
  }
};

// check error in add, edit activity
const checkErrorOperation = error => async dispatch => {
  dispatch(actions.checkErrorRequested());
  try {
    return dispatch(actions.checkErrorSuccess(error));
  } catch (e) {
    console.log(e);
    return dispatch(actions.checkErrorFailure());
  }
};

export default {
  setEventOperation,
  deleteScheduleIdsOperation,
  checkErrorOperation,
};
