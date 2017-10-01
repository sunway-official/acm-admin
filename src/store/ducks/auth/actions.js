import types from './types';

const setCurrentUser = currentUser => ({
  type: types.SET_CURRENT_USER,
  payload: {
    currentUser,
  },
});

export default {
  setCurrentUser,
};
