import types from './types';

const initalState = { openCoOrganizerFormModal: false };

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case types.TOGGLE_CO_ORGANIZER_FORM_MODAL:
      const newState = {
        ...state,
        openCoOrganizerFormModal: !state.openCoOrganizerFormModal,
      };
      return newState;
    default:
      return state;
  }
};

export default reducer;
