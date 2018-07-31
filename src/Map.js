import React from 'react';
import PropTypes from 'prop-types';
import Markers from './Markers';
import InfoWindow from './InfoWindow';

class Map extends React.Component {
  static propTypes = {

  };

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7160857, lng: -73.9990696},
      zoom: 17
    });
  }

  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default Map;
