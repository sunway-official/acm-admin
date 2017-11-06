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
      position: {
        lat: lat,
        lng: long,
      },
    };

    this.onPlacesChanged = this.onPlacesChanged.bind(this);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.onMarkerPositionChanged = this.onMarkerPositionChanged.bind(this);
  }
  onBoundsChanged() {
    this.setState({
      center: this.googleMapRef.getCenter(),
      bounds: this.googleMapRef.getBounds(),
    });
  }
  onPlacesChanged() {
    const google = window.google;

    const places = this.searchBoxRef.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));

    const nextLat = nextMarkers[0].position.lat();
    const nextLng = nextMarkers[0].position.lng();

    const newCenter = {
      lat: nextLat,
      lng: nextLng,
    };
    this.setState(
      {
        center: newCenter,
        position: newCenter,
      },
      () => {
        this.googleMapRef.fitBounds(bounds);
        this.props.onMapPositionChanged(this.state.position);
      },
    );
  }
  onMarkerPositionChanged() {
    const newPosition = this.markerRef.getPosition();
    this.setState(
      {
        position: {
          lat: newPosition.lat(),
          lng: newPosition.lng(),
        },
      },
      () => {
        this.props.onMapPositionChanged(this.state.position);
      },
    );
  }
  render() {
    const google = window.google;
    const center = this.state.center;
    const position = this.state.position;
    return (
      <GoogleMap
        ref={ref => {
          this.googleMapRef = ref;
        }}
        defaultZoom={17}
        defaultCenter={center}
        onBoundsChanged={this.onBoundsChanged}
      >
        <SearchBox
          ref={ref => {
            this.searchBoxRef = ref;
          }}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search the location"
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
        <Marker
          draggable
          ref={ref => {
            this.markerRef = ref;
          }}
          position={position}
          onDragEnd={this.onMarkerPositionChanged}
        />
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(AppMap));
