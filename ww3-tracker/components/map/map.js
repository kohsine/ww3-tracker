import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDELfmgebaV3wanKz383-IKuAl6HcIPwMA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapMarker
            lat={59.955413}
            lng={30.337844}
            size={"3em"}
            colour={"red"}
          />


        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;