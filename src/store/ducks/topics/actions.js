import types from './types';

const setTopics = data => ({
  type: types.SET_TOPICS,
  payload: data,
});

export default {
  setTopics,
};
