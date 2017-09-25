import types from './types';

const getIdRequested = () => ({
  type: types.GET_ID_REQUESTED,
});

const getIdSuccess = id => ({
  type: types.GET_ID_SUCCESS,
  payload: {
    id,
  },
});

const getIdFailure = () => ({
  type: types.GET_ID_FAILURE,
});

export default {
  getIdRequested,
  getIdSuccess,
  getIdFailure,
};
