import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>

        <a className="menu" tabIndex="0">
          <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
          </svg>
        </a>

        <h1 className="heading">Great Eats at Chinatown, New York</h1>

        <Map google={this.props.google}/>

      </div>
    )
  }
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDfbodKmXxdACXyjtz6ziKt8h1f-GB0UFs'
})(App)
