import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import { RaisedButton } from 'material-ui';
import * as moment from 'moment';

const styleBtn = {
  margin: '0px 10px',
};
const OrganizerDetail = props => {
  let deadline = [];
  let reviewDeadline;
  deadline.push(props.conference.dl_review_abstract);
  deadline.push(props.conference.dl_review_abstract);
  deadline.push(props.conference.dl_review_abstract);
  deadline.push(props.conference.dl_review_abstract);
  deadline.some(function(value, index, _arr) {
    if (moment(value).isSameOrAfter()) {
      reviewDeadline = moment(value).format('DD-MM-YYYY');
      return true;
    }
    return false;
  });
  return (
    <Grid fluid className="paper-detail-grid">
      <Row className="paper-card" around="xs">
        <Col xs={12} sm={12} md={7} lg={7} className="paper-col">
          <Row className="card-detail-row first-row">
            <Col xs={3} className="paper-detail-title">
              Topics
            </Col>
            <Col xs={9}>{props.paper.papersTopic.topic_name}</Col>
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
          <Row className="card-detail-row first-row">
            <Col xs={3} className="paper-detail-title">
              Review deadline
            </Col>
            <Col xs={9}>{reviewDeadline}</Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <Col xs={3} className="paper-detail-title">
              Download paper
            </Col>
            <Col xs={9}>
              <u style={{ color: 'rgb(114, 181, 240)' }}>
                Click here to download!
              </u>
            </Col>
          </Row>
          <Row around="xs" className="card-detail-row">
            <RaisedButton
              label="Review now"
              secondary={true}
              style={styleBtn}
            />
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

export default OrganizerDetail;
