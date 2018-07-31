import React from 'react';
import PropTypes from 'prop-types';
import Markers from './Markers';
import InfoWindow from './InfoWindow';

class Map extends React.Component {
  static propTypes = {

  };

  var markers = [];

  initMap() {
    // Creates the default map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7160857, lng: -73.9990696},
      zoom: 17
    });

    // Array of locations
    var locations = [
      {title: 'Hong Kong Supermarket', location: {lat: 40.7158702, lng: -74.0016874}},
      {title: 'New York Mart', location: {lat: 40.7162727, lng: -73.9988872}},
      {title: 'Q Q Bakery', location: {lat: 40.7139409, lng: -73.9972886}},
      {title: 'Vivi Bubble Tea', location: {lat: 40.7153132, lng: -73.9996167}},
      {title: 'Tasty Hand-Pulled Noodles', location: {lat: 40.714193, lng: -73.9982381}}
    ];

    var largeInfowindow = new google.maps.InfoWindow();

    // Default icons
    var defaultIcon = makeMarkerIcon('0091ff');

    // Highlighted Icons
    var highlightedIcon = makeMarkerIcon('FFFF24');

    //-----------------------------MARKER---------------------------------------

    // Loops through each location to create a marker for each location
    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        icon: defaultIcon,
        animation: google.maps.Animation.DROP,
        id: i
      });

      // Push the marker to our array of markers
      markers.push(marker);

      // Open an infowindow at each marker on click
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });

      // Switches between highlighted and default icons on hover
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    }
  }

  // Takes in a color and creates a custom marker icon
  makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
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
  populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker
    if (infowindow.marker != marker) {
      // Clear the infowindow content to give the streetview time to load
      infowindow.setContent('');
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;
      // Fetches streetview information
      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
            var panoramaOptions = {
              position: nearStreetViewLocation,
              pov: {
                heading: heading,
                pitch: 30
              }
            };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>');
        }
      }
      // Fetches closest streetview image within 50 meters of the markers position
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      // Open the infowindow on the correct marker
      infowindow.open(map, marker);
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
