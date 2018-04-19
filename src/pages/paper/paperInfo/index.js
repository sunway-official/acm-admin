import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

const S3_GET_PREFIX = process.env.REACT_APP_S3_GET_PREFIX;

const PaperInfo = props => {
  return (
    <section className="paper-section">
      <Row className="paper-card" around="xs">
        <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
          <Row center="xs" className="card-detail-row first-row">
            <b style={{ fontSize: '1.5em' }}>Paper Information</b>
          </Row>
          <Row className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Title
            </Col>
            <Col xs={9}>{props.paper.title}</Col>
          </Row>
          <Row className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Topics
            </Col>
            <Col xs={9}>{props.paper.topic_name}</Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Keywords
            </Col>
            <Col xs={9}>{props.paper.keywords}</Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Abstract
            </Col>
            <Col xs={9}>{props.paper.abstract}</Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Download paper
            </Col>
            <Col xs={9}>
              {props.paper.file && (
                <a href={S3_GET_PREFIX + props.paper.file} target="_blank">
                  Click here
                </a>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default PaperInfo;
