import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const GoogleMapModal = ({ mapUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mapSrc, setMapSrc] = useState('');

  useEffect(() => {
    setMapSrc(`https://www.google.com/maps/embed?pb=${encodeURIComponent(mapUrl)}`);
  }, [mapUrl]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Google Maps</button>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          {mapUrl && (
            <iframe
              src={mapSrc}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          )}
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default GoogleMapModal;
