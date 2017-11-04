import {} from '../../../pages/schedule/helpers/functions';
import React from 'react';
import { Component } from 'react';
import { images } from '../../../theme';
import './style.css';
import * as moment from 'moment';
class Map extends Component {
  render() {
    const start = moment(this.props.landingPage.conference.start_date).format(
      'DD-MM-YYYY',
    );
    const end = moment(this.props.landingPage.conference.end_date).format(
      'DD-MM-YYYY',
    );
    return (
      <div id="map-body">
        <img src={images.map} alt="" className="map-image" />
        <div className="map-description">
          <h1 className="landingpage-title map">Location</h1>
          <p className="map-title">{this.props.landingPage.conference.title}</p>
          <div className="map-time">
            <p className="map-text">
              From: <span /> {start}
            </p>
            <p className="map-text">
              To: <span /> {end}
            </p>
          </div>
          <div className="map-location">
            <p className="map-text">
              {this.props.landingPage.conference.address.street}
            </p>
            <p className="map-text">
              {this.props.landingPage.conference.address.city}, <span />
              {this.props.landingPage.conference.address.country}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Map;
