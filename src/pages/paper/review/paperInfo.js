import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

const PaperInfo = props => {
  return (
    <Row className="paper-card" around="xs">
      <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
        <Row center="xs" className="card-detail-row first-row">
          <b style={{ fontSize: '1.5em' }}>Paper Information</b>
        </Row>
        <Row around="xs" className="card-detail-row">
          <Col xs={3} className="paper-detail-title">
            Title
          </Col>
          <Col xs={9}>{props.paperInfo.title}</Col>
        </Row>
        <Row around="xs" className="card-detail-row">
          <Col xs={3} className="paper-detail-title">
            Topics
          </Col>
          <Col xs={9}>{props.paperInfo.topic_name}</Col>
        </Row>
        <Row around="xs" className="card-detail-row">
          <Col xs={3} className="paper-detail-title">
            Abstract
          </Col>
          <Col xs={9}>{props.paperInfo.abstract}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PaperInfo;
