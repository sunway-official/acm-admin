import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../store/ducks/auth';
import Loading from './render/renderLoading';

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
            avatar
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
              dl_submit_abstract
              dl_re_submit_abstract
              dl_submit_paper
              dl_re_submit_paper
              address {
                id
                lat
                long
              }
              organizerDetail {
                id
                name
                email
                website
                phone
                address
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
      const conference_id = localStorage.getItem('conference_id');
      localStorage.clear();
      localStorage.setItem('conference_id', conference_id);
    }
    if (nextProps.queryMe.me !== this.props.queryMe.me) {
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
      return <Loading />;
    }

    if (error && needAuth) {
      return (
        <Route
          {...rest}
          render={props => (
            <Redirect to={`/login?redirect=${this.props.path}`} />
          )}
        />
      );
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
      avatar
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
        dl_submit_abstract
        dl_review_abstract
        dl_release_abstract
        dl_re_submit_abstract
        dl_re_review_abstract
        dl_release_final_abstract
        dl_submit_paper
        dl_review_paper
        dl_release_paper
        dl_re_submit_paper
        dl_re_review_paper
        dl_release_final_paper
        dl_registration
        category_id
        category_name
        address {
          id
          lat
          long
        }
        organizerDetail {
          id
          name
          email
          address
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
