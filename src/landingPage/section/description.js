import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import '../css/descriptionStyle.css';
import { images } from '../../theme';

class Description extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={6}>
              <Row>
                <h1 className="landingpage-title">
                  Academic Conference Management
                </h1>
              </Row>
              <Row>
                <p>
                  Prepare to abandon your comfort zone, discover some of the
                  world’s most technologically advanced minds and explore the
                  digital construction trends of tomorrow. Prepare to abandon
                  your comfort zone, discover some of the world’s most
                  technologically advanced minds and explore the digital
                  construction trends of tomorrow.
                </p>
              </Row>
            </Col>
            <Col xs={6}>
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
