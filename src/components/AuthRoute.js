import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';

const AuthRoute = ({
  component: Component,
  needAuth,
  needGuest,
  data: { loading, error },
  ...rest
}) =>
  loading ? (
    <div>Loading...</div>
  ) : (
    <Route
      {...rest}
      render={props =>
        error && needAuth ? (
          <Redirect to="/login" />
        ) : !error && needGuest ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )}
    />
  );

AuthRoute.propTypes = {
  needAuth: PropTypes.bool,
  needGuest: PropTypes.bool,
};

AuthRoute.defaultProps = {
  needAuth: false,
  needGuest: false,
};

const ME_QUERY = gql`
  query Me {
    me {
      id
    }
  }
`;

export default graphql(ME_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true,
  },
})(AuthRoute);
