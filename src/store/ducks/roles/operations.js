import actions from './actions';

const setRolesOperation = data => async dispatch => {
  dispatch(actions.setRolesRequested());
  try {
    return dispatch(actions.setRolesSuccess(data));
  } catch (e) {
    return dispatch(actions.setRolesFailure());
  }
};

export default {
  setRolesOperation,
};
