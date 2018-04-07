import React from 'react';
import { List } from 'material-ui/List';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';

const OrganizerDetail = props => {
  return (
    <Grid fluid className="paper-detail-grid">
      <Row className="paper-card" around="xs">
        <Col xs={12} sm={12} md={7} lg={7} className="paper-col">
          <Row className="card-detail-row first-row">
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
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} className="paper-col">
          <List style={{ padding: '0px' }}>
            <div className="first-row paper-detail-title">Author</div>
            {props.authors}
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
            <Col xs={9}>{props.paper.status}</Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} className="paper-col">
          <List style={{ padding: '0px' }}>
            <div className="first-row paper-detail-title">Reviewers</div>
            {props.reviewers}
          </List>
        </Col>
      </Row>
      <div className="paper-review">
        <Row arround="xs" className="paper-card paper-review-row">
          {props.comments}
        </Row>
      </div>
    </Grid>
  );
};

export default OrganizerDetail;
