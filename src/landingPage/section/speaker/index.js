import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import SpeakerAvatar from './speakerAvatar';

class Speaker extends Component {
  render() {
    return (
      <div className="speaker">
        <Grid fluid id="speaker-grid">
          <Row around="xs" className="section-row">
            <Col xs={10} className="section-col">
              <h1 className="landingpage-title speaker"> The Speakers </h1>
              <p className="speaker-description">
                We attract only the best speakers in the construction industry
                for Academic Conference, bringing you talented individuals with
                creative minds, future-thinkers and innovators.
              </p>
            </Col>
          </Row>
        </Grid>
        <SpeakerAvatar />
      </div>
    );
  }
}
export default Speaker;
