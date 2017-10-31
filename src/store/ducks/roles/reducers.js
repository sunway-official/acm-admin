import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_ROLES_SUCCESS: {
      const newState = Object.assign({}, state, {
        role: action.payload.role,
      });
      return newState;
    }
    case types.SET_ROLES_FAILURE: {
      return console.log('Error');
    }
    default:
      return state;
  }
};

export default reducer;
