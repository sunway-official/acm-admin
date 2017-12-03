import types from './types';

const initalState = {
  openEditFormModalWithPaper: false,
  openAddFormModalWithPaper: false,
  openEditFormModalWithTitle: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case types.TOGGLE_ADD_ACTIVITY_PAPER_FORM_MODAL:
      const addActivityPaper = {
        ...state,
        openAddFormModalWithPaper: !state.openAddFormModalWithPaper,
      };
      return addActivityPaper;
    case types.TOGGLE_EDIT_ACTIVITY_PAPER_FORM_MODAL:
      const editActivityPaper = {
        ...state,
        openEditFormModalWithPaper: !state.openEditFormModalWithPaper,
      };
      return editActivityPaper;
    case types.TOGGLE_ADD_ACTIVITY_TITLE_FORM_MODAL:
      const addActivityTitle = {
        ...state,
        openEditFormModalWithTitle: !state.openEditFormModalWithTitle,
      };
      return addActivityTitle;
    case types.TOGGLE_EDIT_ACTIVITY_TITLE_FORM_MODAL:
      const editActivityTitle = {
        ...state,
        openEditFormModalWithPaper: !state.openEditFormModalWithPaper,
      };
      return editActivityTitle;
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
    case types.DELETE_SCHEDULE_IDS_SUCCESS: {
      const newState = Object.assign({}, state, {
        deleteIds: action.payload.deleteIds,
      });
      return newState;
    }
    case types.DELETE_SCHEDULE_IDS_FAILURE: {
      // Maybe show the error message here?
      return state;
    }
    case types.CHECK_ERROR_SUCCESS: {
      const newState = Object.assign({}, state, {
        error: action.payload.error,
      });
      return newState;
    }
    case types.CHECK_ERROR_FAILURE: {
      // Maybe show the error message here?
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
