import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { queries } from '../helpers';
import { graphql, compose } from 'react-apollo';
import Loading from 'components/render/renderLoading';

const getStatus = point => {
  switch (Math.round(point)) {
    case 1:
      return 'Reject';
    case 2:
      return 'Low Accept';
    case 3:
      return 'Strong Accept';
    case 4:
      return 'Strong Accept';
    case 5:
      return 'Strong Accept';
    default:
      return 'Unknow';
  }
};
class CommentDetail extends Component {
  render() {
    const loading = this.props.GET_PAPER_BY_ID.loading;
    if (loading) return <Loading />;
    let comments;
    let paper;
    if (
      this.props &&
      this.props.GET_PAPER_BY_ID &&
      this.props.GET_PAPER_BY_ID.getPaperByID
    ) {
      paper = this.props.GET_PAPER_BY_ID.getPaperByID;
    }
    if (paper) {
      comments = paper.comments.map(
        (comment, index) =>
          (index + 1) % 10 === 1 ? (
            <Row key={index}>
              <Col xs={12}>
                <Row className="card-detail-row">
                  <Col xs={4}> Reviewer </Col>
                  <Col xs={8}>{comment.reviewer_name}</Col>
                </Row>
                <Row className="card-detail-row">
                  <Col xs={4}>Point</Col>
                  <Col xs={8}>
                    {comment.point} <b>({getStatus(comment.point)})</b>
                  </Col>
                </Row>
                <Row className="card-detail-row">
                  <Col xs={4}>General Comment</Col>
                  <Col xs={8}>{comment.content}</Col>
                </Row>
              </Col>
            </Row>
          ) : (
            ''
          ),
      );
    }
    return (
      <Row className="paper-card">
        {paper ? (
          <Row>
            <Col xs={12}>
              <Row className="card-detail-row">
                <Col xs={4}>Title</Col>
                <Col xs={8}>{paper.title}</Col>
              </Row>
              <Row className="card-detail-row">
                <Col xs={4}>Topic</Col>
                <Col xs={8}>{paper.topic_name}</Col>
              </Row>
            </Col>
          </Row>
        ) : (
          ''
        )}
        {comments}
      </Row>
    );
  }
}

export default compose(
  graphql(queries.GET_PAPER_BY_ID, {
    name: 'GET_PAPER_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.id,
      },
    }),
  }),
)(CommentDetail);
