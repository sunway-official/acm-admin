import types from './types';

const toggleAddActivityFormModal = () => ({
  type: types.TOGGLE_ADD_ACTIVITY_FORM_MODAL,
});

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
  toggleAddActivityFormModal,
  toggleEditActivityFormModal,
  setEventRequested,
  setEventSuccess,
  setEventFailure,
};
