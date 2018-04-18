import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// map paper review question
const ReviewQuestions = props => {
  let reviewComments;
  if (props.reviewComments.length > 0) {
    reviewComments = props.reviewComments.map(
      (comment, index) =>
        index > 1 ? (
          <MenuItem key={index}>
            <Row className={'card-detail-row review-row'} key={index}>
              <Col xs={5} style={{ paddingTop: '24px' }}>
                <p>
                  {index - 1}
                  . <span />
                  <b>{comment.content}</b>
                </p>
              </Col>
              <Col xs={2}>
                <Row center="xs">
                  <div style={{ marginTop: '40px' }}>{comment.point}</div>
                </Row>
              </Col>
              <Col xs={5}>
                <div style={{ marginTop: '40px' }}>{comment.comment}</div>
              </Col>
            </Row>
          </MenuItem>
        ) : (
          ''
        ),
    );
  }
  return (
    <Menu>
      <Row className="paper-card" around="xs">
        <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
          <Row center="xs" style={{ paddingTop: '24px' }}>
            <Col xs={5}>
              <b> Evaluation Category </b>
            </Col>
            <Col xs={2}>
              <b>Point</b>
            </Col>
            <Col xs={5}>
              <b>Comment </b>
            </Col>
          </Row>
          {reviewComments}
          <hr
            style={{
              width: '50%',
              height: '2px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: '0',
            }}
          />
          <Row className={'card-detail-row review-row'} key={1}>
            <Col xs={12} style={{ paddingTop: '24px' }}>
              <h2>Detail comment</h2>
            </Col>
          </Row>
          <Row>
            <div style={{ marginLeft: '10px' }}>
              {props.reviewComments[1].comment}
            </div>
          </Row>
          <Row className={'card-detail-row review-row'} key={2}>
            <Col xs={12} style={{ paddingTop: '24px' }}>
              <h2>Confidential Comments for Committee</h2>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '24px' }}>
            <div style={{ marginLeft: '10px' }}>
              {props.reviewComments[2].comment}
            </div>
          </Row>
        </Col>
      </Row>
    </Menu>
  );
};

export default ReviewQuestions;
