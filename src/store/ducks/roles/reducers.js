import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_ROLES_SUCCESS: {
      const newState = Object.assign({}, state, {
        data: action.payload.data,
      });
      return newState;
    }
    case types.SET_ROLES_FAILURE: {
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
