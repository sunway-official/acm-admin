import types from './types';
const initialState = {
  openModal: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOGGLE: {
      return {
        ...state,
        openModal: !state.openModal,
      };
    }
    case types.SET_PAPER: {
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
