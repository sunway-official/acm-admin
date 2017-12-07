import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import { images } from '../../../../theme';

class Description extends Component {
  render() {
    return (
      <div className="description-section">
        <Grid fluid id="description-grid">
          <Row className="section-row">
            <Col xs={6} className="section-col">
              <Row around="xs" className="section-row">
                <Col xs={10}>
                  <h1 className="landingpage-title description">
                    {this.props.landingPage.conference.title}
                  </h1>
                  <p className="section-text">
                    {this.props.landingPage.conference.description}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={6} className="section-col">
              <img
                src={images.conference5}
                className="img landing conference2"
                alt=""
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Description;
