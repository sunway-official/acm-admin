import actions from './actions';

const setEventOperation = event => async dispatch => {
  dispatch(actions.setEventRequested());
  try {
    return dispatch(actions.setEventSuccess(event));
  } catch (e) {
    console.log(e);
    return dispatch(actions.setEventFailure());
  }
};

export default {
  setEventOperation,
};
