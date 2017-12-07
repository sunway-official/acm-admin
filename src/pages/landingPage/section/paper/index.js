import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { images } from '../../../../theme';
import './style.css';

class Paper extends Component {
  render() {
    return (
      <div className="description-section">
        <Grid fluid id="paper-grid">
          <Row className="section-row">
            <Col xs={6} className="section-col">
              <img
                src={images.conference2}
                className="img landing conference2 paper-image"
                alt=""
              />
            </Col>
            <Col xs={6} className="section-col">
              <Row around="xs" className="section-row">
                <Col xs={10}>
                  <h1 className="landingpage-title description">
                    Call for papers is now open!
                  </h1>
                  <p className="section-text">
                    {this.props.landingPage.call_paper_description}
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
