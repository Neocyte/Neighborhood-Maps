import React from 'react';
import Map from './Map';
import './App.css';


class App extends React.Component {
  // Takes in a Google Maps API key and loads it as an asynchronous script
  componentDidMount() {
    this.loadMapScript('https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyDfbodKmXxdACXyjtz6ziKt8h1f-GB0UFs&v=3&callback=initMap');
  }

  loadMapScript(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
  }

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

export default App;
