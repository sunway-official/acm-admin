import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';

class AuthRoute extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.error) {
      localStorage.clear();
    }
    if (nextProps.data.me) {
      // TODO: Add user id to local storage
      // localStorage.setItem('userId', nextProps.data.me.id);
    }
  }
  render() {
    const {
      component: Component,
      needAuth,
      needGuest,
      data: { loading, error },
      ...rest
    } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }

    if (error && needAuth) {
      return <Route {...rest} render={props => <Redirect to="/login" />} />;
    }

    if (!error && needGuest) {
      return <Route {...rest} render={props => <Redirect to="/" />} />;
    }

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

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
