import React, { PureComponent } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

class AppMap extends PureComponent {
  constructor(props) {
    super(props);

    const { lat, long } = this.props.initalPosition;

    this.state = {
      bounds: null,
      center: {
        lat: lat,
        lng: long,
      },
      markers: [],
    };
  }
  render() {
    const google = window.google;
    console.log(this.props);
    return (
      <GoogleMap defaultZoom={17} defaultCenter={{ ...this.state.center }}>
        <SearchBox
          ref={this.props.onSearchBoxMounted}
          bounds={this.props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {this.props.isMarkerShown && (
          <Marker position={{ ...this.state.center }} />
        )}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(AppMap));
