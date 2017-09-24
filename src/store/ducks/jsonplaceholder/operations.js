import apisauce from 'apisauce';
import actions from './actions';

const api = apisauce.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const getAllPostsOperation = () => async dispatch => {
  dispatch(actions.getAllPostsRequested());
  try {
    const result = await api.get('/posts');
    return dispatch(actions.getAllPostsSuccess(result.data));
  } catch (e) {
    console.log(e);
    return dispatch(actions.getAllPostsFailure());
  }
};

export default {
  getAllPostsOperation,
};
