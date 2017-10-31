import actions from './actions';

const setRoleOperations = role => async dispatch => {
  dispatch(actions.setRolesRequested());
  try {
    return dispatch(actions.setRolesSuccess(role));
  } catch (e) {
    return dispatch(actions.setRolesFailure());
  }
};

export default {
  setRoleOperations,
};
