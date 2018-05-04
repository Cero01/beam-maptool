
import React from "react";
import db from '../../location_tracking.json';
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers, } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
} = require("react-google-maps");


const coords = [];

// const coords = [
//   { lat: 21.0186659, lng: 105.8177959 },
//   { lat: 21.0186582, lng: 105.8177993 },
//   { lat: 21.0186614, lng: 105.8178008 }
// ];


const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQdNfguX8GtAlfY2REJxrucMudJQb_fIQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `900px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    // onMarkerClustererClick: () => (markerClusterer) => {
    //   const clickedMarkers = markerClusterer.getMarkers()
    //   console.log(`Current clicked markers length: ${clickedMarkers.length}`)
    //   console.log(clickedMarkers)
    // },

    onMarkerClick: () => () => {
      console.log("hi");
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 21.0186983, lng: 105.8178167 }}
  >
    {/* <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          onClick={props.onMarkerClick}
          key={marker.location_id}
          position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
        />
      ))} 
    </MarkerClusterer>*/}
    {db.DbLocation.map(marker => (
      <Marker
        onClick={props.onMarkerClick}
        key={marker.id}
        position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
        icon={{ url: "https://i.imgur.com/5EyUU0B.png" }}
      />

    ))}

    <Polyline
      path={coords}
      geodesic={true}
      options={{ strokeColor: '#4a96f2', strokeWeight: 8, }}
    />
  </GoogleMap>
);


class DemoApp extends React.PureComponent {

  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    fetch("http://apidev.trafficbeam.net/api/location/get", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "distance": 100000,
        "latitude": 21.0186983,
        "longitude": 105.8178167,
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data });
      });

    db.DbLocation.map(location => {
      coords.push({
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      });
    })

    console.log(db.DbLocation.lat);
  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}
export default DemoApp;
