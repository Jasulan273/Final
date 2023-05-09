import React from 'react';
import './Map.css'

const MapPopup = ({ selectedCountry, handleCloseMapPopup }) => {
  return (
    <div className="map-popup">
      <div className="map-popup-header">
        <h3>{selectedCountry.name}</h3>
        <button className="close-button" onClick={handleCloseMapPopup}>
          <span>&times;</span>
        </button>
      </div>
      <div className="map-popup-content">
        {/* Map content */}
      </div>
    </div>
  );
};

export default MapPopup;
