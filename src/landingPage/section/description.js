import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import '../css/descriptionStyle.css';
import { images } from '../../theme';

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
                    Academic Conference Management
                  </h1>
                  <p className="section-text">
                    Over the course of two intensive (but fun) days, we’ll
                    gather for a series of keynotes, panel, and interactive
                    seminar sessions from BIM and digital construction experts
                    from across the globe. We’ll be addressing everything new in
                    the world of digital construction and advanced technologies;
                    from artificial intelligence to predictive data. Plus,
                    you’ll also get exclusive access to never before seen
                    technological developments.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={6} className="section-col">
              <img
                src={images.conference5}
                className="img conference2"
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
