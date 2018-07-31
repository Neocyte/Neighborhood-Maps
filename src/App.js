import React from 'react';
import { Route, Link } from 'react-router-dom';
import Map from './Map';
import List from './List';
import Filter from './Filter';
import './App.css';


class App extends React.Component {
  // Takes in a Google Maps API key and loads it as an asynchronous script
  componentDidMount() {
    loadMapScript('https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyDfbodKmXxdACXyjtz6ziKt8h1f-GB0UFs&v=3&callback=initMap')
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
      <div className="App">

      </div>
    );
  }
}

export default App;
