import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';

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
class Preview extends Component {
  render() {
    let comments;
    let paper = this.props.paper;
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row className="paper-card">
          {paper ? (
            <Row style={{ width: '100%' }}>
              <Col xs={12}>
                <Row className="card-detail-row">
                  <Col xs={4}>Title</Col>
                  <Col xs={8}>{paper.title}</Col>
                </Row>
                <Row className="card-detail-row">
                  <Col xs={4}>Topic</Col>
                  <Col xs={8}>{paper.topic_name}</Col>
                </Row>
                <Row className="card-detail-row">
                  <Col xs={4}>Point</Col>
                  <Col xs={8}>
                    {Math.round(this.props.generalPoint)}{' '}
                    <b>({getStatus(this.props.generalPoint)})</b>
                  </Col>
                </Row>
                <Row center="xs">
                  <Col>
                    <RaisedButton primary={true} label="Submit" type="submit" />
                    <RaisedButton
                      className="marginLeft"
                      label="Cancel"
                      onClick={this.props.handleClose}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            ''
          )}
          {comments}
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'Preview', // a unique identifier for this form
})(Preview);
