import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER: {
      const newState = { ...state, currentUser: action.payload.currentUser };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
