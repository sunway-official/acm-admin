import types from './types';

// TOGGLE ADD
const toggleAddActivityPaperFormModal = () => ({
  type: types.TOGGLE_ADD_ACTIVITY_PAPER_FORM_MODAL,
});

// TOGGLE EDIT
const toggleEditActivityPaperFormModal = () => ({
  type: types.TOGGLE_EDIT_ACTIVITY_PAPER_FORM_MODAL,
});

const toggleAddActivityTitleFormModal = () => ({
  type: types.TOGGLE_ADD_ACTIVITY_TITLE_FORM_MODAL,
});

const toggleEditActivityTitleFormModal = () => ({
  type: types.TOGGLE_EDIT_ACTIVITY_TITLE_FORM_MODAL,
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

// CHECK ERROR
const checkErrorRequested = () => ({
  type: types.CHECK_ERROR_REQUESTED,
});

const checkErrorSuccess = error => ({
  type: types.CHECK_ERROR_SUCCESS,
  payload: {
    error,
  },
});

const checkErrorFailure = () => ({
  type: types.CHECK_ERROR_FAILURE,
});

export default {
  toggleAddActivityPaperFormModal,
  toggleEditActivityPaperFormModal,
  toggleAddActivityTitleFormModal,
  toggleEditActivityTitleFormModal,
  setEventRequested,
  setEventSuccess,
  setEventFailure,
  deleteScheduleIdsRequested,
  deleteScheduleIdsSuccess,
  deleteScheduleIdsFailure,
  checkErrorRequested,
  checkErrorSuccess,
  checkErrorFailure,
};
