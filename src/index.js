import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloProvider from 'react-apollo/ApolloProvider';
import initalizedData from './lib/initData';

import App from './containers/App';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider
      client={initalizedData.apolloClient}
      store={initalizedData.store}
    >
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
