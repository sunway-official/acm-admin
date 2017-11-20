import types from './types';

const setRoles = data => ({
  type: types.SET_ROLES,
  payload: data,
});

export default {
  setRoles,
};
