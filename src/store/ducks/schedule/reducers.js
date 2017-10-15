import types from './types';

const initalState = { openEditFormModal: false };

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case types.TOGGLE_EDIT_ACTIVITY_FORM_MODAL:
      const newState = {
        ...state,
        openEditFormModal: !state.openEditFormModal,
      };
      return newState;
    case types.SET_EVENT_SUCCESS: {
      const newState = Object.assign({}, state, {
        event: action.payload.event,
      });
      return newState;
    }
    case types.SET_EVENT_FAILURE: {
      // Maybe show the error message here?
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
