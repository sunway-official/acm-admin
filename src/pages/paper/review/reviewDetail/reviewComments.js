import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

// map paper review question
const ReviewQuestions = props => {
  let reviewComments;
  if (props.reviewComments.length > 0) {
    reviewComments = props.reviewComments.map(
      (comment, index) =>
        index > 1 ? (
          <Row className={'review-row'} key={index}>
            <Col xs={5} style={{ paddingTop: '24px' }}>
              <div>
                {index - 1}
                . <span />
                {comment.content}
              </div>
            </Col>
            <Col xs={2}>
              <div style={{ textAlign: 'center', paddingTop: '24px' }}>
                {' '}
                {comment.point}
              </div>
            </Col>
            <Col xs={5}>
              <div style={{ paddingTop: '24px' }}>{comment.comment}</div>
            </Col>
          </Row>
        ) : (
          ''
        ),
    );
  }
  const role = localStorage.getItem('roles');
  return (
    <section className="paper-section">
      <Row className="paper-card" around="xs">
        <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
          <Row center="xs" className="first-row">
            <b style={{ fontSize: '1.5em' }}>Reviewer Comments</b>
          </Row>
          <Row style={{ paddingTop: '24px' }}>
            <Col xs={5}>
              <b style={{ paddingLeft: '24px' }}> Evaluation Category </b>
            </Col>
            <Col xs={2} style={{ textAlign: 'center' }}>
              <b>Point</b>{' '}
              <div style={{ paddingTop: '8px', color: 'rgba(0,0,0,0.6)' }}>
                (1 = Poor, 5 = Execellent)
              </div>
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
          <Row className={'review-row'}>
            <Col xs={12}>
              <h2>Detail comment</h2>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '24px' }}>
            <div style={{ marginLeft: '10px' }}>
              <div>
                <b>Average point: </b>
                {props.reviewComments[0].point}
              </div>
              <div style={{ marginTop: '12px' }}>
                {props.reviewComments[0].comment}
              </div>
            </div>
          </Row>
          {role === '7' ? (
            ''
          ) : (
            <div>
              <Row>
                <Col xs={12}>
                  <h2>Confidential Comments for Committee</h2>
                </Col>
              </Row>
              <Row style={{ paddingBottom: '24px' }}>
                <div style={{ marginLeft: '10px' }}>
                  {props.reviewComments[1].comment}
                </div>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default ReviewQuestions;
