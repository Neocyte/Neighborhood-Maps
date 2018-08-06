import React from 'react';

class Map extends React.Component {

  state = {
    locations: [
      {title: 'Hong Kong Supermarket', location: {lat: 40.7158702, lng: -74.0016874}, venueId: '4ae4bf7ef964a520bf9d21e3'},
      {title: 'New York Mart', location: {lat: 40.7162727, lng: -73.9988872}, venueId: '4e358975c65b2313e28e56c7'},
      {title: 'Q Q Bakery', location: {lat: 40.7139409, lng: -73.9972886}, venueId: '4bf042f4f831c9285fce01f2'},
      {title: 'Vivi Bubble Tea', location: {lat: 40.7153132, lng: -73.9996167}, venueId: '4a83505ef964a520bffa1fe3'},
      {title: 'Tasty Hand-Pulled Noodles', location: {lat: 40.714193, lng: -73.9982381}, venueId: '4a7655b0f964a520dce21fe3'}
    ],
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
  };

  componentDidMount() {
    this.initMap();
    this.clickLocationList();
  }

  //------------------------------MAP-------------------------------------------

  // Creates the default map and adds the markers
  initMap() {
    const {google} = this.props;

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7160857, lng: -73.9990696},
      zoom: 17
    });

    this.addMarkers();
  }

  //-------------------------Location List--------------------------------------

  // Shows a location's marker and infowindow when the user clicks on the list
  clickLocationList = () => {
    const {infowindow} = this.state;

    const showLocation = (event) => {
      const {markers} = this.state
      const markerIndex = markers.findIndex(m => m.title.toLowerCase() === event.target.innerText.toLowerCase());

      this.populateInfoWindow(markers[markerIndex], infowindow);
    };

    document.querySelector('.locations-list').addEventListener('click', function (event) {
      if (event.target && event.target.nodeName === "LI") {
        showLocation(event);
      }
    });
  };

  //-----------------------------Filter-----------------------------------------

  // Filters what locations are visible based on the user's query value
  handleQuery = (event) => {
    const {locations, query, markers, infowindow} = this.state;

    this.setState({query: event.target.value});

    if (query) {
      locations.forEach((location, index) => {
        // Reveals marker if query is successful
        if (location.title.toLowerCase().includes(query.toLowerCase())) {
          markers[index].setVisible(true);
        } else {
          // Close infowindow if marker is removed
          if (infowindow.marker === markers[index]) {
            infowindow.close();
          }
          // Hides marker if query is unsuccessful
          markers[index].setVisible(false);
        }
      });
    } else {
      // Reveal all markers if query is empty
      locations.forEach((location, index) => {
        if (markers.length && markers[index]) {
          markers[index].setVisible(true);
        }
      });
    }
  };

  //-----------------------------MARKER-----------------------------------------

  // Loops through each location to create a marker for each location
  addMarkers = () => {
    const {google} = this.props;
    const defaultIcon = this.makeMarkerIcon('F00');
    const bounds = new google.maps.LatLngBounds();

    this.state.locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: location.location,
        map: this.map,
        title: location.title,
        icon: defaultIcon,
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

      // Extend bounds object
      bounds.extend(marker.position);
    });

    this.map.fitBounds(bounds);
  };

  // Takes in a color and creates a custom marker icon
  makeMarkerIcon = (markerColor) => {
    const {google} = this.props;
    let markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  };

  //-----------------------------INFOWINDOW-------------------------------------

  // Controls infowindow animations and content
  populateInfoWindow = (marker, infowindow) => {
    const {google} = this.props
    const {markers} = this.state;
    const defaultIcon = this.makeMarkerIcon('F00');
    const highlightedIcon = this.makeMarkerIcon('FFFF33');

    // Checks to make sure the infowindow is not already opened on this marker
    if (infowindow.marker !== marker) {
      // Changes marker icon color of clicked marker and add bounce
      marker.setIcon(highlightedIcon);
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }

      // Resets the previous marker if a new marker is focussed
      if (infowindow.marker) {
        const markerIndex = markers.findIndex(m => m.title === infowindow.marker.title);
        markers[markerIndex].setIcon(defaultIcon);
        markers[markerIndex].setAnimation(null);
      }

      // Resets the previous marker if the infowindow is closed
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
        marker.setAnimation(null);
        marker.setIcon(defaultIcon);
      });

      // Adds information to each marker's infowindow
      infowindow.marker = marker;
      this.getInfo(marker);

      // Opens the infowindow on the correct marker
      infowindow.open(this.map, marker);
    }
  };

  // Fetches data from foursquare API that will be used in the infowindow - https://foursquare.com/
  getInfo = (marker) => {
    const {infowindow} = this.state;
    const clientId = "2NAKRXQ3FJ3GIIHDD4Q4W1EI2HL4PTIWKTAMW0Q2HQHGWTIJ";
    const clientSecret = "YBND1TNSSL3UKGUFWDBTPDB5OD2KHEYI0PN1SDW3SF12TSYQ";
    let venueId = '';
    const url = "https://api.foursquare.com/v2/venues/" + venueId + "?&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180802";

    fetch(url)
      .then(
        function (response) {
          if (response.status !== 200) {
            infowindow.setContent("Data failed to load");
            return;
          }

          // Examine the text in the response
          response.json().then(function (data) {
            let name_data = data.response.venue.name;
            let location_data = data.response.venue.location.formattedAddress;
            let contact_data = data.response.venue.contact.formattedPhone;
            let url_data = data.response.venue.url;
            let rating_data = data.response.venue.rating;

            let name = '<b>' + name_data + '</b>' + '<br>';
            let address = '<b>Address: </b>' + location_data + '<br>';
            let phone = '<b>Phone: </b>' + contact_data + '<br>';
            let site = '<b>Website: </b>' + url_data + '<br>';
            let rating = '<b>Rating: </b>' + rating_data + '<br>';
            let more = '<a href="https://foursquare.com/v/'+ data.response.venue.id +'" target="_blank">Read More on Foursquare Website</a>'

            infowindow.setContent(name + address + phone + site + rating + more);
          });
        }
      )
      .catch(function (error) {
        infowindow.setContent("Data failed to load");
      });
  };

  //-----------------------------RENDER-----------------------------------------

  render() {
    return (
      <div className="container">

        <div className="text-input">
          <input
            role="search"
            aria-label="search"
            type="text"
            placeholder="Filter Locations"
            value={this.state.query}
            tabIndex="0"
            onChange={this.handleQuery}
          />

          <ul className="locations-list">
          {
            this.state.markers.filter(m => m.getVisible()).map((m, index) =>
              (<li key={index} role="button" tabIndex="0">{m.title}</li>))
          }
          </ul>
        </div>

        <div role="application" className="map" id="map"></div>

      </div>
    )
  }
}

export default Map;
