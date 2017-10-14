import types from './types';

const toggleEditActivityFormModal = () => ({
  type: types.TOGGLE_EDIT_ACTIVITY_FORM_MODAL,
});

const setEventRequested = () => ({
  type: types.SET_EVENT_REQUESTED,
});

const setEventSuccess = event => ({
  type: types.SET_EVENT_SUCCESS,
  payload: {
    event,
  },
});

const setEventFailure = () => ({
  type: types.SET_EVENT_FAILURE,
});

export default {
  toggleEditActivityFormModal,
  setEventRequested,
  setEventSuccess,
  setEventFailure,
};
