import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import './style.css';
import OrganizerDetail from './organizerDetail';
import ReviewerDetail from './reviewerDetail';

import Loading from 'components/render/renderLoading';

class Index extends Component {
  render() {
    const loadingPaper = this.props.GET_PAPER_BY_ID.loading;
    const loadingReviewer = this.props.GET_ALL_USERS_BY_ROLE_ID_QUERY.loading;
    if (loadingPaper || loadingReviewer) return <Loading />;
    let paper;
    paper = this.props.GET_PAPER_BY_ID.getPaperByID;
    const reviewers = paper.reviewers;
    const conferenceReviewer = this.props.GET_ALL_USERS_BY_ROLE_ID_QUERY
      .getAllUsersByRoleID;
    const role = localStorage.getItem('roles');

    return (
      <div className="conference">
        <Subheader className="subheader">
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
          <Link to="/conference/papers">
            <span>Papers List</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Paper Detail</span>
        </div>
        <div className="dashboard content d-flex">
          {role === '6' ? (
            <ReviewerDetail paper={paper} conference={paper.conference} />
          ) : (
            <OrganizerDetail
              paper={paper}
              reviewers={reviewers}
              conferenceReviewer={conferenceReviewer}
            />
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_PAPER_BY_ID, {
    name: 'GET_PAPER_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(queries.GET_ALL_USERS_BY_ROLE_ID_QUERY, {
    name: 'GET_ALL_USERS_BY_ROLE_ID_QUERY',
    options: ownProps => ({
      variables: {
        role_id: 6,
      },
    }),
  }),
)(Index);
