import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import Error from './Error';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="heading">Great Eats at Chinatown, New York</h1>
        <Error />
        <Map google={this.props.google}/>
        <footer>
          <a href="https://developer.foursquare.com/docs/api/venues/details" className="api-link" tabIndex="0">Powered By Foursquare Places API</a>
        </footer>
      </div>
    )
  }
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDfbodKmXxdACXyjtz6ziKt8h1f-GB0UFs'
})(App)
