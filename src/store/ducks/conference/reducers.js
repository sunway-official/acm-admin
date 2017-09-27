/**
 * Use if needed
 */
// import { combineReducers } from "redux";
import types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_CONFERENCE_SUCCESS: {
      const newState = Object.assign({}, state, {
        conference: action.payload.conference,
      });
      return newState;
    }
    case types.GET_CONFERENCE_FAILURE: {
      // Maybe show the error message here?
      return state;
    }
    case types.GET_ID_SUCCESS: {
      const newState = Object.assign({}, state, {
        id: action.payload.id,
      });
      return newState;
    }
    case types.GET_ID_FAILURE: {
      // Maybe show the error message here?
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
