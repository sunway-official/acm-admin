import types from './types';

// TOGGLE ADD
const toggleAddActivityFormModal = () => ({
  type: types.TOGGLE_ADD_ACTIVITY_FORM_MODAL,
});

// TOGGLE EDIT
const toggleEditActivityFormModal = () => ({
  type: types.TOGGLE_EDIT_ACTIVITY_FORM_MODAL,
});

// SET EVENT
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

// DELETE SCHEDULE IDS
const deleteScheduleIdsRequested = () => ({
  type: types.DELETE_SCHEDULE_IDS_REQUESTED,
});

const deleteScheduleIdsSuccess = deleteIds => ({
  type: types.DELETE_SCHEDULE_IDS_SUCCESS,
  payload: {
    deleteIds,
  },
});

const deleteScheduleIdsFailure = () => ({
  type: types.DELETE_SCHEDULE_IDS_FAILURE,
});

export default {
  toggleAddActivityFormModal,
  toggleEditActivityFormModal,
  setEventRequested,
  setEventSuccess,
  setEventFailure,
  deleteScheduleIdsRequested,
  deleteScheduleIdsSuccess,
  deleteScheduleIdsFailure,
};
