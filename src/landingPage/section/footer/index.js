import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';

class Footer extends Component {
  render() {
    return (
      <div id="landingpage-footer">
        <Grid fluid>
          <Row>
            <Col xs={4}>
              <h1 className="footer-logo">ACM</h1>
            </Col>
            <Col xs={4}>
              <h3 className="footer-title">Contact Us</h3>
              <p className="footer-text">Phone: 0123456789</p>
              <p className="footer-text">Email: academicconference@gmail.com</p>
            </Col>
            <Col xs={4}>
              <h3 className="footer-title">Connect With Us</h3>
              <div className="icon-cover">
                <i
                  className="fa fa-facebook-square fa-lg footer-icon"
                  aria-hidden="true"
                />
                <i
                  className="fa fa-twitter-square fa-lg footer-icon"
                  aria-hidden="true"
                />
                <i
                  className="fa fa-linkedin-square fa-lg footer-icon"
                  aria-hidden="true"
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Footer;
