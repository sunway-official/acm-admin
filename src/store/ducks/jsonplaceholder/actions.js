import types from './types';

const getAllPostsRequested = () => ({
  type: types.GET_ALL_POSTS_REQUESTED,
});

const getAllPostsSuccess = posts => ({
  type: types.GET_ALL_POSTS_SUCCESS,
  payload: {
    posts,
  },
});

const getAllPostsFailure = () => ({
  type: types.GET_ALL_POSTS_FAILURE,
});

export default {
  getAllPostsRequested,
  getAllPostsSuccess,
  getAllPostsFailure,
};
