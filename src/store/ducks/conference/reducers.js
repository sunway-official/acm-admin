/**
 * Use if needed
 */
// import { combineReducers } from "redux";
import types from './types';
const initialState = {
  stepIndex: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // GET CONFERENCE
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

    // GET ID
    case types.GET_ID_SUCCESS: {
      const newState = Object.assign({}, state, {
        id: action.payload.id,
      });
      return newState;
    }
    case types.GET_ID_FAILURE: {
      return state;
    }

    // GET POSITION
    case types.GET_POSITION_SUCCESS: {
      const newState = Object.assign({}, state, {
        position: action.payload.position,
      });
      return newState;
    }
    case types.GET_POSITION_FAILURE: {
      return state;
    }
    case types.SET_STEPINDEX_SUCCESS: {
      const newState = Object.assign({}, state, {
        stepIndex: action.payload.stepIndex,
      });
      return newState;
    }
    case types.SET_STEPINDEX_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
