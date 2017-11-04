import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import * as moment from 'moment';
class Register extends Component {
  render() {
    const start = moment(this.props.landingPage.conference.start_date).format(
      'DD-MM-YYYY',
    );
    const end = moment(this.props.landingPage.conference.end_date).format(
      'DD-MM-YYYY',
    );
    return (
      <div className="orange-section">
        <Grid fluid>
          <Row around="xs" className="section-row">
            <Col xs={10}>
              <Row>
                <h1 className="landingpage-title register">
                  {this.props.landingPage.conference.title}
                </h1>
              </Row>
              <Row>
                <p className="register-description">
                  {this.props.landingPage.register_description}
                </p>
              </Row>
              <Row className="register-final-row">
                <Col xs={4} className="register-col">
                  <Row> Where </Row>
                  <Row>{this.props.landingPage.conference.address.street} </Row>
                  <Row>
                    <div>
                      {this.props.landingPage.conference.address.city}, <span />
                      {this.props.landingPage.conference.address.country}
                    </div>
                  </Row>
                </Col>
                <Col xs={3}>
                  <Row> When </Row>
                  <Row>
                    From: <span /> {start}
                  </Row>
                  <Row>
                    To: <span /> {end}
                  </Row>
                </Col>
                <Col xs={4}>
                  <button className="btn register-button">
                    Register Today
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Register;
