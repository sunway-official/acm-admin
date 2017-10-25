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

const deleteScheduleIdsOperation = deleteIds => async dispatch => {
  dispatch(actions.deleteScheduleIdsRequested());
  try {
    return dispatch(actions.deleteScheduleIdsSuccess(deleteIds));
  } catch (e) {
    console.log(e);
    return dispatch(actions.deleteScheduleIdsFailure());
  }
};

export default {
  setEventOperation,
  deleteScheduleIdsOperation,
};
