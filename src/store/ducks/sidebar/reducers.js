import types from './types';
const initialState = {
  openModal: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SIDEBAR: {
      return {
        ...state,
        openModal: !state.openModal,
      };
    }
    default:
      return state;
  }
};

export default reducer;
