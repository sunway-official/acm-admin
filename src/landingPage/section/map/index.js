import React from 'react';
import { Component } from 'react';
import { images } from '../../../theme';
import './style.css';

class Map extends Component {
  render() {
    return (
      <div id="map-body">
        <img src={images.map} alt="" className="map-image" />
        <div className="map-description">
          <h1 className="landingpage-title map">Location</h1>
          <p className="map-title">Academic Conference </p>
          <div className="map-time">
            <p className="map-text">From: 1/11/2017 </p>
            <p className="map-text">To: 1/12/2017 </p>
          </div>
          <div className="map-location">
            <p className="map-text">Duy Tan University</p>
            <p className="map-text">182 Nguyen Van Linh</p>
            <p className="map-text">Da Nang - Viet Nam</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Map;
