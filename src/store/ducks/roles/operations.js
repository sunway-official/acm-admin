import actions from './actions';

const setRolesOperation = roles => async dispatch => {
  dispatch(actions.setRolesRequested());
  try {
    return dispatch(actions.setRolesSuccess(roles));
  } catch (e) {
    return dispatch(actions.setRolesFailure());
  }
};

export default {
  setRolesOperation,
};
