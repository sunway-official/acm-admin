import initApollo from './initApollo';
import initRedux from '../store';

const apolloClient = initApollo();
const store = initRedux(apolloClient);

export default {
  apolloClient,
  store,
};
