import React from 'react';

class Error extends React.Component {
  render() {
    return (
      <h1 className="api-error">Google Maps API failed to load</h1>
    )
  }
}

// Listens for Google Maps API errors
window.gm_authFailure = function () {
  document.querySelector('.api-error').style.display = 'block';
}

export default Error;
