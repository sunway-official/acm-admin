import types from './types';

const setToggle = () => ({
  type: types.SET_TOGGLE,
});
const setPaper = data => ({
  type: types.SET_PAPER,
  payload: data,
});

export default {
  setPaper,
  setToggle,
};
