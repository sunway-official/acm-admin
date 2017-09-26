/**
 * Use if needed
 */
// import { combineReducers } from "redux";
import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_SUCCESS: {
      const newState = Object.assign({}, state, {
        posts: action.payload.posts,
      });
      return newState;
    }
    case types.GET_ALL_POSTS_FAILURE: {
      // Maybe show the error message here?
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
