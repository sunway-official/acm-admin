import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import { AppBar } from 'material-ui';
import { Col, Grid, Row } from 'react-flexbox-grid';
import colors from '../../../theme/color';
import MultipleSelect from './multipleSelect';
import './style.css';

import Loading from 'components/render/renderLoading';

class Index extends Component {
  render() {
    const loadingPaper = this.props.GET_PAPER_BY_ID.loading;
    if (loadingPaper) return <Loading />;
    let paper;
    paper = this.props.GET_PAPER_BY_ID.getPaperByID;
    let authors;
    let reviewers;
    let comments;

    // map author information
    authors = paper.authors.map(author => (
      <ListItem
        key={author.id}
        leftIcon={
          <ActionAccountCircle
            color={colors.main}
            className="paper-detail-icon"
          />
        }
        rightIcon={
          // eslint-disable-next-line
          author.corresponding == 1 ? (
            <CommunicationVpnKey color="37d67a" />
          ) : (
            <p />
          )
        }
      >
        {author.author_name}
      </ListItem>
    ));
    //map reviewer information
    if (paper.status !== 'Assigning') {
      reviewers = paper.reviewers.map(reviewer => (
        <ListItem
          key={reviewer.id}
          leftIcon={
            <ActionAccountCircle
              color={colors.main}
              className="paper-detail-icon"
            />
          }
        >
          {reviewer.reviewer_name}
        </ListItem>
      ));
    } else {
      reviewers = <MultipleSelect />;
    }

    // map comment of each reviewer
    comments = paper.comments.map(comment => (
      <div key={comment.id} className="paper-detail-comment">
        <Col xs={2}>
          <Row center="xs">
            <ActionAccountCircle
              color={colors.main}
              className="first-row paper-detail-icon"
            />
          </Row>
        </Col>
        <Col xs={9}>
          <Row className="card-detail-row first-row">
            <Col xs={9}>
              <Row className="card-detail-row">{comment.reviewer_name}</Row>
              <Row className="card-detail-row">Point : {comment.point}</Row>
              <Row className="card-detail-row">
                Detail review:{' '}
                <u style={{ color: 'rgb(114, 181, 240)' }}> this is a link</u>
              </Row>
            </Col>
            <Col xs={3}>
              <div>24/03/2018</div>
            </Col>
          </Row>
          <Row around="xs" className="card-detail-row comment-content-row">
            <div>{comment.content}</div>
          </Row>
        </Col>
      </div>
    ));
    console.log(paper);
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Conference Information</span>
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
        <AppBar
          className="landing-page-app-bar"
          title={paper.title}
          showMenuIconButton={false}
        />
        <div className="dashboard content d-flex">
          <Grid fluid className="paper-detail-grid">
            <Row className="paper-card" around="xs">
              <Col xs={12} sm={12} md={7} lg={7} className="paper-col">
                <Row className="card-detail-row first-row">
                  <Col xs={3} className="paper-detail-title">
                    Topics
                  </Col>
                  <Col xs={9}>{paper.papersTopic[0].topic_name}</Col>
                </Row>
                <Row around="xs" className="card-detail-row">
                  <Col xs={3} className="paper-detail-title">
                    Keywords
                  </Col>
                  <Col xs={9}>{paper.keywords}</Col>
                </Row>
                <Row around="xs" className="card-detail-row">
                  <Col xs={3} className="paper-detail-title">
                    Abstract
                  </Col>
                  <Col xs={9}>{paper.abstract}</Col>
                </Row>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} className="paper-col">
                <List style={{ padding: '0px' }}>
                  <div className="first-row paper-detail-title">Author</div>
                  {authors}
                </List>
              </Col>
            </Row>
            <Row className="paper-card" around="xs">
              <Col xs={12} sm={12} md={7} lg={7} className="paper-col">
                <Row around="xs" className="card-detail-row first-row">
                  <Col xs={3} className="paper-detail-title">
                    Average point
                  </Col>
                  <Col xs={9}>4.5</Col>
                </Row>
                <Row around="xs" className="card-detail-row">
                  <Col xs={3} className="paper-detail-title">
                    Paper status
                  </Col>
                  <Col xs={9}>{paper.status}</Col>
                </Row>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} className="paper-col">
                <List style={{ padding: '0px' }}>
                  <div className="first-row paper-detail-title">Reviewers</div>
                  {reviewers}
                </List>
              </Col>
            </Row>
            <div className="abc">
              <Row arround="xs" className="paper-card paper-review-row">
                {comments}
              </Row>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  if (state.topics) {
    return {
      topic: state.topics.data,
    };
  }
};
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(queries.GET_PAPER_BY_ID, {
    name: 'GET_PAPER_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
)(Index);
