import React from 'react';
import AppMap from 'components/AppMap';
import { Component } from 'react';
class Map extends Component {
  render() {
    const position = this.props.landingPage.conference.address;
    return (
      <div className="map">
        <AppMap
          disabled={true}
          initalPosition={{
            lat: parseFloat(position.lat),
            long: parseFloat(position.long),
          }}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDFNlwjsuntl-BmMpDKJPOiUvwxhAEyMEI"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={
            <div
              style={{
                height: `100%`,
                margin: '0 auto',
              }}
            />
          }
        />
      </div>
    );
  }
}
export default Map;
