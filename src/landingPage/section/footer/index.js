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
              <p className="footer-text">
                Phone: <span /> {this.props.landingPage.phone_number}
              </p>
              <p className="footer-text">
                Email: <span /> {this.props.landingPage.email}
              </p>
            </Col>
            <Col xs={4}>
              <h3 className="footer-title">Connect With Us</h3>
              <div className="icon-cover">
                <a href={this.props.landingPage.facebook_id}>
                  <i
                    className="fa fa-facebook-square fa-lg footer-icon"
                    aria-hidden="true"
                  />
                </a>
                <a href={this.props.landingPage.twitter_id}>
                  <i
                    className="fa fa-twitter-square fa-lg footer-icon"
                    aria-hidden="true"
                  />
                </a>
                <a href={this.props.landingPage.linkedin_id}>
                  <i
                    className="fa fa-linkedin-square fa-lg footer-icon"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Footer;
