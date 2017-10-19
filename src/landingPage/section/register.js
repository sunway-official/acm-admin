import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import '../css/registerStyle.css';

class Register extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <h1 className="register-title">Academic Conference Management</h1>
          </Row>
          <Row>
            <p>
              Prepare to abandon your comfort zone, discover some of the world’s
              most technologically advanced minds and explore the digital
              construction trends of tomorrow.
            </p>
          </Row>
          <Row className="register-final-row">
            <Col xs={4}>
              <Row> Where </Row>
              <Row> Duy Tan University </Row>
              <Row> Da Nang, Viet Nam </Row>
            </Col>
            <Col xs={3}>
              <Row> When </Row>
              <Row> From 1/1/2018 </Row>
              <Row> To 2/2/2018 </Row>
            </Col>
            <Col xs={4}>
              <button className="btn register-button">Register Today</button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Register;
