import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import colors from '../../../theme/color';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import { Link } from 'react-router-dom';

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
const CommentDetail = props => {
  const role = localStorage.getItem('roles');
  let comments;
  comments = props.paper.comments.map(
    (comment, index) =>
      (index + 1) % 10 === 1 ? (
        <Row key={index}>
          <Col xs={2}>
            <Row center="xs">
              <ActionAccountCircle
                color={colors.main}
                className="paper-detail-icon reviewer-icon"
              />
            </Row>
          </Col>
          <Col xs={9}>
            <Row className="card-detail-row">
              <Col xs={9}>
                <Row className="card-detail-row">
                  <Col className="paper-detail-title" xs={4}>
                    {' '}
                    Reviewer{' '}
                  </Col>
                  <Col xs={8}>
                    {role === '1' ? (
                      <Link to={`/user-profile/${comment.user.id}`}>
                        {comment.reviewer_name}
                      </Link>
                    ) : (
                      'Anonymous'
                    )}
                  </Col>
                </Row>
                <Row className="card-detail-row">
                  <Col className="paper-detail-title" xs={4}>
                    Point
                  </Col>
                  <Col xs={8}>
                    {comment.point} <b>({getStatus(comment.point)})</b>
                  </Col>
                </Row>
                <Row className="card-detail-row">
                  <Col className="paper-detail-title" xs={4}>
                    Detail review{' '}
                  </Col>
                  <Col xs={8}>
                    <Link
                      to={`/conference/paper/review-detail/${comment.user
                        .id}/${props.paper.id}`}
                    >
                      Click here
                    </Link>
                  </Col>
                </Row>
                <Row className="card-detail-row">
                  <Col className="paper-detail-title" xs={4}>
                    General Comment
                  </Col>
                  <Col xs={8}>{comment.content}</Col>
                </Row>
              </Col>
              <Col xs={3}>
                <div>24/03/2018</div>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        ''
      ),
  );
  return (
    <Row className="paper-card" around="xs">
      <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
        <Row center="xs" className="card-detail-row first-row">
          <b style={{ fontSize: '1.5em' }}>Reviewer Comment</b>
        </Row>
        {comments}
      </Col>
    </Row>
  );
};

export default CommentDetail;
