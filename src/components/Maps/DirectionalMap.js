
import React from "react";
import db from '../../location_tracking.json';
// const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { createMuiTheme } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const demoFancyMapStyles = require("./demoFancyMapStyles.json");
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} = require("react-google-maps");




const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#0089ff',
      hover: '#1976d2',
      contrastText: '#ffffff',
    },
  },
});

const styles = ({
  list: {
    width: 450
  },

  buttonOpen: {
    position: 'absolute',
    top: 100,
    right: 50,
  },

  buttonSubmit: {
    margin: theme.spacing.unit * 4,
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',

  },

  margin: {
    margin: theme.spacing.unit * 4,
  },

});


const coords = [];
let coordsInput = [];
let coordsOutput = [];
// const coords2 = [
//   { lat: 21.0186659, lng: 105.8177959 },
//   { lat: 21.0186582, lng: 105.8177993 },
//   { lat: 21.0186614, lng: 105.8178008 }
// ];


const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQdNfguX8GtAlfY2REJxrucMudJQb_fIQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `965px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
  withHandlers({
    // onMarkerClustererClick: () => (markerClusterer) => {
    //   const clickedMarkers = markerClusterer.getMarkers()
    //   console.log(`Current clicked markers length: ${clickedMarkers.length}`)
    //   console.log(clickedMarkers)
    // },

    onMarkerClick: () => (marker) => {
      console.log("lat: " + marker.lat);
      console.log("lng: " + marker.lng);
      console.log("bearing: " + marker.bearing);
      console.log("speed: " + marker.speed);
      console.log("accuracy: " + marker.accuracy);
      console.log("time: " + marker.time);
      console.log("timeText: " + marker.timeText);
      console.log("elapsedRealtime: " + marker.elapsedRealtime);
      console.log("------------------------------------------");

    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 21.0186983, lng: 105.8178167 }}
    defaultOptions={{ styles: demoFancyMapStyles }}
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

    {/* {db.DbLocation.map(marker => (
      <Marker
        onClick={props.onMarkerClick}
        key={marker.id}
        position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
        icon={{ url: "https://i.imgur.com/5EyUU0B.png" }}
      />

    ))} */}

    {props.isPolylineShown && <Polyline
      path={coordsOutput}
      geodesic={true}
      options={{
        strokeColor: '#4a96f2',
        strokeWeight: 8,
      }}
    />}

    {props.isPolylineShown && coordsOutput.map(marker => (
      <Marker
        onClick={
          props.onMarkerClick.bind(this, marker)
        }
        key={marker.id}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{ url: "https://i.imgur.com/5EyUU0B.png" }}
      >

        {/* {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <p>xxxxxxxxx</p>
        </InfoWindow>} */}
      </Marker>

    ))}
    {/* <Marker
      position={{ lat: 21.0186659, lng: 105.8177959 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <p>xxxxxxxxx</p>
      </InfoWindow>}
      </Marker> */}
  </GoogleMap>
);



class DirectionalMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      markers: [],
      value: '',
      polyline: false,
      timeStart: '2018-04-18T13:04',
      timeEnd: '2018-04-18T13:05',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleDrawer = (toggle) => () => {
    this.setState({
      open: toggle,
    });
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleTimeStartChange(event) {
    this.setState(
      {
        timeStart: event.target.value,
      }
    );
  }

  handleTimeEndChange(event) {
    this.setState(
      {
        timeEnd: event.target.value,
      }
    );
  }

  handleSubmit(event) {
    coordsInput = JSON.parse(this.state.value);
    const epochStart = new Date(this.state.timeStart).getTime();
    const epochEnd = new Date(this.state.timeEnd).getTime();
    coordsInput.map(location => {
      if (parseInt(location.time, 10) >= epochStart && parseInt(location.time, 10) <= epochEnd)
        
        coordsOutput.push({
          id: parseInt(location.time, 10),
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng),
          bearing: parseFloat(location.bearing),
          speed: parseFloat(location.speed),
          accuracy: parseFloat(location.accuracy),
          time: parseInt(location.time, 10),
          timeText: location.timeText,
          elapsedRealtime: parseInt(location.elapsedRealtime, 10),
        });
      
    })

    this.setState({ polyline: true });
    event.preventDefault();

  }

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

  }

  render() {
    const { classes } = this.props;

    const closeButton = (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.toggleDrawer(false)}
      >
        <Close />
      </IconButton>
    );
    const sideList = (
      <div className={classes.list}>
        {closeButton}
      </div>
    );

    // const submitJSON = (
    //   <div>
    //     <form onSubmit={this.handleSubmit}>
    //       <label>
    //         JSON:
    //           <input type="text" value={this.state.value} onChange={this.handleChange} />
    //       </label>
    //       <input type="submit" value="Submit" />
    //     </form>
    //   </div>

    // );

    const submitJSON = (
      <form className={classes.margin}>
        <FormControl fullWidth>
          <InputLabel
            htmlFor="custom-css-input"
          >
            Submit JSON
        </InputLabel>
          <Input
            classes={{
              underline: classes.cssUnderline,
            }}
            id="custom-css-input"
            multiline
            rowsMax="30"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </FormControl>
        
          <TextField
          className={classes.margin}
            id="datetime-local"
            label="Select Start"
            type="datetime-local"
            //defaultValue={new Date(1524031453280).toISOString().slice(0,19)}
            value={this.state.timeStart}
            onChange={this.handleTimeStartChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
          className={classes.margin}
            id="datetime-local"
            label="Select End"
            type="datetime-local"
            //defaultValue={new Date(1524031529268).toISOString().slice(0,19)}
            value={this.state.timeEnd}
            onChange={this.handleTimeEndChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <Button  variant="raised" size="large" color="primary" className={classes.buttonSubmit} onClick={this.handleSubmit}>Submit</Button>
      </form>
    );

    return (
      <div>
        <MapWithAMarkerClusterer isPolylineShown={this.state.polyline} markers={this.state.markers} />
        <Button variant="raised" size="large" color="primary" className={classes.buttonOpen} onClick={this.toggleDrawer(true)}>Preview</Button>

        <Drawer
          anchor={'right'}
          open={this.state.open}
          variant={'temporary'}
        >
          {sideList}
          {submitJSON}
        </Drawer>

      </div>
    )
  }
}




export default withStyles(styles)(DirectionalMap);
