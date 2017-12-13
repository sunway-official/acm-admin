import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import * as moment from 'moment';
import { withRouter } from 'react-router';
class Register extends Component {
  constructor() {
    super();
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleRegister() {
    localStorage.setItem('conference_id', this.props.id);
    this.props.history.replace('/register');
  }
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
                <Col xs={3}>
                  <Row> When </Row>
                  <Row>
                    <p className="register-text">
                      From: <span /> {start}
                    </p>
                  </Row>
                  <Row>
                    <p className="register-text">
                      To: <span /> {end}
                    </p>
                  </Row>
                </Col>
                <Col xs={4}>
                  <button
                    className="btn register-button"
                    onClick={this.handleRegister}
                  >
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
export default withRouter(Register);
