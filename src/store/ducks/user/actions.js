import types from './types';

const setUser = data => ({
  type: types.SET_USER,
  payload: data,
});

export default {
  setUser,
};
