import React from 'react';
import PropTypes from 'prop-types';
import Markers from './Markers';
import InfoWindow from './InfoWindow';

class Map extends React.Component {
  static propTypes = {

  };

  var markers = [];

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7160857, lng: -73.9990696},
      zoom: 17
    });

    var locations = [
      {title: 'Hong Kong Supermarket', location: {lat: 40.7158702, lng: -74.0016874}},
      {title: 'New York Mart', location: {lat: 40.7162727, lng: -73.9988872}},
      {title: 'Q Q Bakery', location: {lat: 40.7139409, lng: -73.9972886}},
      {title: 'Vivi Bubble Tea', location: {lat: 40.7153132, lng: -73.9996167}},
      {title: 'Tasty Hand-Pulled Noodles', location: {lat: 40.714193, lng: -73.9982381}}
    ];

    var largeInfowindow = new google.maps.InfoWindow();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });

      // Push the marker to our array of markers.
      markers.push(marker);

      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
    }
  }

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }
  }

  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default Map;
