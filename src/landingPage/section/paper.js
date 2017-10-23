import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { images } from '../../theme';
import '../css/paperStyle.css';

class Paper extends Component {
  render() {
    return (
      <div className="description-section">
        <Grid fluid id="paper-grid">
          <Row>
            <Col xs={6} className="section-col">
              <img
                src={images.conference5}
                className="img conference2"
                alt=""
              />
            </Col>
            <Col xs={6} className="section-col">
              <Row around="xs">
                <Col xs={10}>
                  <h1 className="landingpage-title description">
                    Call for papers is now open!
                  </h1>
                  <p className="section-text">
                    We’re seeking speakers to join us at this truly
                    one-of-a-kind event in the construction industry. BIM Show
                    Live is best known for its high-profile, content-driven
                    approach to digital construction and showcases the very best
                    in modern construction methods, techniques and technologies.
                    Which is why we are inviting everyone and anyone with a
                    passion for BIM to come forward and request a speaker place.
                  </p>
                </Col>
              </Row>
              <Row around="xs">
                <button className="btn paper-button">Submit Now</button>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Paper;
