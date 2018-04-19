import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

const ReviewerInfo = props => {
  return (
    <section className="paper-section">
      <Row className="paper-card" around="xs">
        <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
          <Row center="xs" className="card-detail-row first-row">
            <b style={{ fontSize: '1.5em' }}>Reviewer Information</b>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Name
            </Col>
            <Col xs={9}>
              {props.reviewerInfo.firstname} <span />
              {props.reviewerInfo.lastname}
            </Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Email
            </Col>
            <Col xs={9}>{props.reviewerInfo.email}</Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Bio
            </Col>
            <Col xs={9}>{props.reviewerInfo.bio}</Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Position
            </Col>
            <Col xs={9}>{props.reviewerInfo.position}</Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default ReviewerInfo;
