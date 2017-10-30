import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { images } from '../../../theme';
import './style.css';

class Map extends Component {
  render() {
    return (
      <div id="map-body">
        <img src={images.map} alt="" className="map-image" />
      </div>
    );
  }
}
export default Map;
