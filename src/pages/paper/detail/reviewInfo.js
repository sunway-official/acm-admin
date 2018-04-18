import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import MultipleSelect from './multipleSelect';
import CommentDetail from './commentDetail';

const ReviewInfo = props => {
  const role = localStorage.getItem('roles');
  let selectReviewer = (
    <Row className="paper-card" around="xs">
      <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
        <Row center="xs" className="card-detail-row first-row">
          <b style={{ fontSize: '1.5em' }}>Select Reviewer</b>
        </Row>
        <Row className="card-detail-row">
          <Col xs={3} className="paper-detail-title">
            Select paper reviewer
          </Col>
          <Col xs={9}>
            <MultipleSelect
              reviewers={props.conferenceReviewer}
              paper_id={props.paper.id}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
  return (
    <div>
      {props.paper.status === 'Assigning' && role === '1' ? selectReviewer : ''}
      {props.paper.comments.length > 0 ? (
        <CommentDetail paper={props.paper} />
      ) : (
        ''
      )}
    </div>
  );
};

export default ReviewInfo;
