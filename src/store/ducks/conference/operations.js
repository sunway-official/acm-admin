import actions from './actions';

const getIdOperation = id => async dispatch => {
  dispatch(actions.getIdRequested());
  try {
    return dispatch(actions.getIdSuccess(id));
  } catch (e) {
    console.log(e);
    return dispatch(actions.getIdFailure());
  }
};

export default {
  getIdOperation,
};
