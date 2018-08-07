import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="heading">Great Eats at Chinatown, New York</h1>
        <Map google={this.props.google}/>
      </div>
    )
  }
}

// Listens for Google Maps API errors
function gm_authFailure() {
  alert("Google Maps API failed to load");
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDfbodKmXxdACXyjtz6ziKt8h1f-GB0UFs'
})(App)
