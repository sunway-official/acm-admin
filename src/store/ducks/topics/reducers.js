import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_TOPICS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
