import types from './types';

const setRolesRequested = () => ({
  type: types.SET_ROLES_REQUESTED,
});

const setRolesSuccess = roles => ({
  type: types.SET_ROLES_SUCCESS,
  payload: {
    roles,
  },
});

const setRolesFailure = () => ({
  type: types.SET_ROLES_FAILURE,
});

export default {
  setRolesRequested,
  setRolesSuccess,
  setRolesFailure,
};
