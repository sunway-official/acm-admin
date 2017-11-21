import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../store/ducks/auth';

class AuthRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.subscribeToMe = this.subscribeToMe.bind(this);
  }
  subscribeToMe() {
    this.props.queryMe.subscribeToMore({
      document: gql`
        subscription {
          Me {
            id
            firstname
            lastname
            gender
            email
            bio
            dob
            linkedin_id
            facebook_id
            twitter_id
            position
            organization
            currentConference {
              id
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        if (subscriptionData && subscriptionData.data.Me) {
          this.props.setCurrentUser(subscriptionData.data.Me);
        }
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.queryMe.error) {
      localStorage.clear();
    }
    if (nextProps.queryMe.me) {
      this.props.setCurrentUser(nextProps.queryMe.me);
    }
  }
  componentDidMount() {
    this.subscribeToMe();
  }
  render() {
    const {
      component: Component,
      needAuth,
      needGuest,
      queryMe: { loading, error },
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
      firstname
      lastname
      gender
      email
      bio
      dob
      linkedin_id
      facebook_id
      twitter_id
      position
      organization
      currentConference {
        id
        title
        description
        start_date
        end_date
        address {
          lat
          long
        }
        organizerDetail {
          id
          name
          email
          website
          phone
        }
        coOrganizerDetails {
          id
          name
          email
          website
          phone
          conference {
            id
          }
        }
      }
    }
  }
`;

const mapDispatchToProps = dispatch => ({
  setCurrentUser: bindActionCreators(authActions.setCurrentUser, dispatch),
  // getId: id => dispatch(conferenceOperations.getIdOperation(id)),
});

export default compose(
  graphql(ME_QUERY, {
    name: 'queryMe',
    options: {
      notifyOnNetworkStatusChange: true,
    },
  }),
  connect(null, mapDispatchToProps),
)(AuthRoute);
