import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import SelectPoint from './selectPoint';
import { RaisedButton } from 'material-ui';
import CustomInput from '../../../../components/CustomInput';

const validate = (values, props) => {
  const errors = {};
  const requiredFields = [];
  props.questions.forEach(question => {
    requiredFields.push('point' + question.id);
    requiredFields.push('input' + question.id);
  });
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  return errors;
};

// map paper review question
const ReviewQuestions = props => {
  let questions;
  if (props.questions.length > 0) {
    questions = props.questions.map(
      (question, index) =>
        index > 1 ? (
          <Row className={'card-detail-row review-row'} key={index}>
            <Col xs={5} style={{ paddingTop: '24px' }}>
              <label className="title-label">
                {index - 1}
                . <span />
                {question.content}
              </label>
            </Col>
            <Col xs={3}>
              <SelectPoint id={'point' + (index + 1)} />
            </Col>
            <Col xs={4}>
              <Field
                name={'input' + (index + 1)}
                component={CustomInput}
                hintText="Enter your comment"
                multiLine={true}
                rows={2}
                rowsMax={3}
                fullWidth={true}
              />
            </Col>
          </Row>
        ) : (
          ''
        ),
    );
  }
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <section className="paper-section">
        <Row className="paper-card" around="xs">
          <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
            <Row center="xs" className="card-detail-row first-row">
              <b style={{ fontSize: '1.5em' }}>Reviewer Comments</b>
            </Row>
            <Row style={{ paddingTop: '24px' }}>
              <Col xs={5}>
                <b> Evaluation Category </b>
              </Col>
              <Col xs={3}>
                <b>Point</b> <span> (1 = Poor, 5 = Execellent) </span>
              </Col>
              <Col xs={4}>
                <b>Comment </b>
              </Col>
            </Row>
            {questions}
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
                <b>
                  <h2>Detail comment</h2>
                </b>
                <br />
                <label className="title-label">
                  {props.questions[0].content}
                </label>
              </Col>
            </Row>
            <Row>
              <Field
                name={'input' + 1}
                component={CustomInput}
                hintText="Enter your comment"
                multiLine={true}
                rows={2}
                rowsMax={3}
                fullWidth={true}
                style={{ marginLeft: '10px' }}
              />
            </Row>
            <Row className={'card-detail-row review-row'} key={2}>
              <Col xs={12} style={{ paddingTop: '24px' }}>
                <b>
                  <h2>Confidential Comments for Committee</h2>
                </b>
                <br />
                <label className="title-label">
                  {props.questions[1].content}
                </label>
              </Col>
            </Row>
            <Row>
              <Field
                name={'input' + 2}
                component={CustomInput}
                hintText="Enter your comment"
                multiLine={true}
                rows={2}
                rowsMax={3}
                fullWidth={true}
                style={{ marginLeft: '10px' }}
              />
            </Row>
            <Row
              center="xs"
              style={{ paddingBottom: '24px', paddingTop: '24px' }}
            >
              <RaisedButton
                className="btn"
                label="Submit"
                primary={true}
                type="submit"
                onClick={props.handleSubmit}
              />
            </Row>
          </Col>
        </Row>
      </section>
    </form>
  );
};

export default reduxForm({
  form: 'ReviewQuestions', // a unique identifier for this form
  validate,
})(ReviewQuestions);
