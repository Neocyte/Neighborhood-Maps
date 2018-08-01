import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {

  state = {
    locations = [
      {title: 'Hong Kong Supermarket', location: {lat: 40.7158702, lng: -74.0016874}},
      {title: 'New York Mart', location: {lat: 40.7162727, lng: -73.9988872}},
      {title: 'Q Q Bakery', location: {lat: 40.7139409, lng: -73.9972886}},
      {title: 'Vivi Bubble Tea', location: {lat: 40.7153132, lng: -73.9996167}},
      {title: 'Tasty Hand-Pulled Noodles', location: {lat: 40.714193, lng: -73.9982381}}
    ],
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
    defaultIcon: makeMarkerIcon('0091ff'),
    highlightedIcon: makeMarkerIcon('FFFF24')
  };

  componentDidMount() {
    this.initMap();
    this.clickLocationList();
  }

  //------------------------------MAP-------------------------------------------

  initMap() {
    // Creates the default map
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7160857, lng: -73.9990696},
      zoom: 17
    });
    this.addMarkers();
  }

  //-------------------------Location List--------------------------------------

  clickLocationList = () => {
    const {infowindow} = this.state;

    const showLocation = (event) => {
      const {markers} = this.state
      const markerIndex =
        markers.findIndex(m => m.title.toLowerCase() === e.target.innerText.toLowerCase());
        this.populateInfoWindow(markers[markerIndex], infowindow);
    };

    document.querySelector('.locations-list').addEventListener('click', function (event) {
      if (e.target && e.target.nodeName === "LI") {
        showLocation(event);
      }
    });
  }

  //-----------------------------Filter-----------------------------------------

  handleQuery = (event) => {
    this.setState({query: event.target.value});
  }

  //-----------------------------MARKER-----------------------------------------

  addMarkers = () => {
    const bounds = new google.maps.LatLngBounds();

    // Loops through each location to create a marker for each location
    this.state.locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: location.location,
        map: this.map,
        title: location.title
        icon: this.state.defaultIcon,
        animation: google.maps.Animation.DROP
      });

      // Push the marker to our array of markers
      this.setState((state) => ({
        markers: [...state.markers, marker]
      }));

      // Open an infowindow at each marker on click
      marker.addListener('click', () => {
        this.populateInfoWindow(marker, this.state.infowindow);
      });

      // Switches between highlighted and default icons on hover
      marker.addListener('mouseover', () => {
        this.setIcon(this.state.highlightedIcon);
      });
      marker.addListener('mouseout', () => {
        this.setIcon(this.state.defaultIcon);
      });
    }

  // Takes in a color and creates a custom marker icon
  makeMarkerIcon = (markerColor) => {
    const markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }

  //-----------------------------INFOWINDOW-------------------------------------

  // Adds information to each marker's infowindow
  populateInfoWindow = (marker, infowindow) => {
    // Check to make sure the infowindow is not already opened on this marker
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<h3>${marker.title}</h3>');
      // Make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
      });
      // Open the infowindow on the correct marker
      infowindow.open(this.map, marker);
    }
  }

  //-----------------------------RENDER-----------------------------------------

  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default Map;
