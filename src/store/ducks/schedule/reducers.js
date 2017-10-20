import types from './types';

const initalState = { openEditFormModal: false, openAddFormModal: false };

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case types.TOGGLE_ADD_ACTIVITY_FORM_MODAL:
      const add = {
        ...state,
        openAddFormModal: !state.openAddFormModal,
      };
      return add;
    case types.TOGGLE_EDIT_ACTIVITY_FORM_MODAL:
      const edit = {
        ...state,
        openEditFormModal: !state.openEditFormModal,
      };
      return edit;
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
