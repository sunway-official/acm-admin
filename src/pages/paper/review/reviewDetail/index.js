import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { queries } from '../../helpers';
import { AppBar } from 'material-ui';
import PaperInfo from '../../paperInfo';
import ReviewComment from './reviewComments';
import { Grid } from 'react-flexbox-grid';

import Loading from 'components/render/renderLoading';
import ReviewerInfo from './reviewerInfo';

class Index extends Component {
  render() {
    const loadingPaper = this.props.GET_PAPER_BY_ID.loading;
    const loadingPaperReview = this.props
      .GET_PAPER_REVIEW_BY_USER_ID_PAPER_ID_QUERY.loading;
    const loadingReviewer = this.props.GET_USER_BY_ID_QUERY.loading;
    if (loadingPaper || loadingPaperReview || loadingReviewer)
      return <Loading />;
    const paper = this.props.GET_PAPER_BY_ID.getPaperByID;
    const reviewComments = this.props.GET_PAPER_REVIEW_BY_USER_ID_PAPER_ID_QUERY
      .getPaperReviewByUserIdPaperId;
    const reviewerInfo = this.props.GET_USER_BY_ID_QUERY.getUserByID;
    const role = localStorage.getItem('roles');
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
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
          <span>Paper Review Detail</span>
        </div>
        <AppBar
          className="landing-page-app-bar"
          title=""
          showMenuIconButton={false}
        />
        <div className="dashboard content d-flex">
          <Grid fluid className="paper-detail-grid">
            <PaperInfo paper={paper} />
            {role === '1' ? <ReviewerInfo reviewerInfo={reviewerInfo} /> : ''}
            {reviewComments.length > 0 ? (
              <ReviewComment reviewComments={reviewComments} />
            ) : (
              ''
            )}
          </Grid>
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
        id: ownProps.match.params.paper_id,
      },
    }),
  }),
  graphql(queries.GET_USER_BY_ID_QUERY, {
    name: 'GET_USER_BY_ID_QUERY',
    options: ownProps => ({
      variables: {
        userId: ownProps.match.params.reviewer_id,
      },
    }),
  }),
  graphql(queries.GET_PAPER_REVIEW_BY_USER_ID_PAPER_ID_QUERY, {
    name: 'GET_PAPER_REVIEW_BY_USER_ID_PAPER_ID_QUERY',
    options: ownProps => ({
      variables: {
        user_id: ownProps.match.params.reviewer_id,
        paper_id: ownProps.match.params.paper_id,
      },
    }),
  }),
)(Index);
