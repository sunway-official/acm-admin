import types from './types';

const setToggle = () => ({
  type: types.SET_TOGGLE,
});
const setPaper = data => ({
  type: types.SET_PAPER,
  payload: data,
});

// DELETE Author IDS
const deleteAuthorIdsRequested = () => ({
  type: types.DELETE_AUTHOR_IDS_REQUESTED,
});

const deleteAuthorIdsSuccess = deleteIds => ({
  type: types.DELETE_AUTHOR_IDS_SUCCESS,
  payload: {
    deleteIds,
  },
});

const deleteAuthorIdsFailure = () => ({
  type: types.DELETE_AUTHOR_IDS_FAILURE,
});

export default {
  setPaper,
  setToggle,
  deleteAuthorIdsRequested,
  deleteAuthorIdsSuccess,
  deleteAuthorIdsFailure,
};
