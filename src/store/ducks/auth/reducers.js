import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.TEST: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
