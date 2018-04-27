import { IconButton, Subheader } from 'material-ui';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../changeAvatar/userAvatar';
import GeneralInfo from '../generalInfo';
import InfoTabs from '../myProfile/tab';
import { queries } from '../helpers';
import { compose, graphql } from 'react-apollo';

import Loading from 'components/render/renderLoading';
class UserProfile extends Component {
  render() {
    const loadingUser = this.props.GET_USER_BY_ID_QUERY.loading;
    if (loadingUser) return <Loading />;
    const me = this.props.GET_USER_BY_ID_QUERY.getUserByID;
    return (
      <div className="conference">
        <Subheader className="subheader-user subheader">
          {localStorage.getItem('conferenceTitle')}
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dashboard</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>User Profile</span>
        </div>
        <div className="dashboard content d-flex">
          <div className="contain">
            <div className="form-container">
              <div className="left-div">
                <div className="card" id="left-form-container">
                  <UserAvatar avatar={me.avatar} />
                  <GeneralInfo me={me} onSubmit="" />
                </div>
              </div>
              <div className="right-div">
                <div className="card" id="right-form-container">
                  <div className="card-content">
                    <InfoTabs me={me} disabled={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_USER_BY_ID_QUERY, {
    name: 'GET_USER_BY_ID_QUERY',
    options: ownProps => ({
      variables: {
        userId: ownProps.match.params.id,
      },
    }),
  }),
)(UserProfile);
