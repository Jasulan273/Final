import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import countriesData from "./countriesData";
import "./Map.css";
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import './18n';
import Modal from 'react-modal';


const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

const EuropeMap = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {

    i18n.changeLanguage(language);
  };
  const [mapUrl, setMapUrl] = React.useState('');

  const openMapModal = (url) => {
    setMapUrl(url);
  };

  const closeModal = () => {
    setMapUrl('');
  };
  const GoogleMapModal = ({ mapUrl, closeModal }) => {
    return (
      <Modal isOpen={!!mapUrl} onRequestClose={closeModal}>
        {mapUrl && (
          <iframe
            src={mapUrl}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    );
  };





  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleMarkerClick = (country) => {
    setSelectedCountry(country);
  };

  const handleClosePopup = () => {
    setSelectedCountry(null);
  };



  return (
    <div className="map-container">
      <ComposableMap
        width={1000}
        height={500}
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-26.0, -53.0, -26],
          scale: 800
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#9998A3" stroke="#EAEAEC" />
            ))
          }
        </Geographies>

        {countriesData.map((country, index) => (
          <Marker
            key={index}
            coordinates={country.coordinates}
            onClick={() => handleMarkerClick(country)}
            style={{
              default: { fill: "#FF5722" },
              hover: { fill: "#E53935" },
              pressed: { fill: "#D32F2F" }
            }}
          >
            <circle r={9} className="marker" />
          </Marker>
        ))}
      </ComposableMap>

      {/* Popup for Switzerland */}
      {selectedCountry && selectedCountry.name === "Switzerland" && (
        <div className="popup popup-scrollable">
          <div className="popup-header">
            <h3>{selectedCountry.name}</h3>
            <button className="close-button" onClick={handleClosePopup}>
              <span>&times;</span>
            </button>
          </div>
          <div className="popup-content">
            <div className="country-card">
              <h3>Valley Hostel</h3>
              <p>Fuhren, 3822 Лаутербруннен, Швейцария</p>
              <ul className="advantages-list">
                <li>{t('freeParking')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('greatBreakfast')}</li>
              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-wbPRSI" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>

                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2741.544393886692!2d7.9078893!3d46.59624350000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478fa1b6873fb711%3A0x8a7ffde84ccc3b71!2sValley%20Hostel!5e0!3m2!1sru!2skz!4v1683650550573!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!4v1683745417513!6m8!1m7!1sCAoSK0FGMVFpcFBGTmRENm5pX3B1WmoxX0ZVd0F2SUtFUWllaEhfZDlEd3JFWUE.!2m2!1d46.5961891!2d7.907934200000001!3f184.6621303870844!4f-23.602452732277285!5f0.4000000000000002"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  Панорама
                </a>

                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />

                <GoogleMapModal mapUrl="" />

              </div>
            </div>

            <div className="country-card">
              <h3>City Hotel Biel Bienne</h3>
              <p>Aarbergstrasse 29, 2502 Биль, Швейцария</p>
              <ul className="advantages-list">
                <li>{t('freeParking')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('coffeeTeaFacilities')}</li>
                <li>{t('greatBreakfast')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-dj5glE" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.3893879407287!2d7.239417200000001!3d47.130636900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e195af6255555%3A0x82aa0f4389652ba!2sCity%20Hotel%20Biel%20Bienne%20Free%20Parking!5e0!3m2!1sru!2skz!4v1683647033167!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683746791040!6m8!1m7!1sCAoSLEFGMVFpcFBsNHFaOUE3QkZveHFiclg0aVdYZmM2VE91aUFyVEZnUlluRXRp!2m2!1d47.13081917!2d7.23925561!3f314.4822912053373!4f-14.642282349611719!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>

            <div className="country-card">
              <h3>Dorint Blüemlisalp Beatenberg/Interlaken</h3>
              <p>Schmockenstrasse 163, 3803 Беатенберг, Швейцария</p>
              <ul className="advantages-list">
                <li>{t('indoorPool')}</li>
                <li>{t('spaAndWellnessCenter')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('fitnessCenter')}</li>
                <li>{t('bar')}</li>
                <li>{t('amazingBreakfast')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-G6rzVw" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.8197005350075!2d7.773410400000002!3d46.6895594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478faf8bfb33de8b%3A0xaa6b6ebe621da6ac!2sDorint%20Bl%C3%BCemlisalp!5e0!3m2!1sru!2skz!4v1683647095846!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747037021!6m8!1m7!1sCAoSLEFGMVFpcE1iZE5Pc3RPbS1qajJUUmpRZjRzUUtzSFllR2FING9ycFF5cnhN!2m2!1d46.6896576!2d7.773344900000001!3f9.788091126952503!4f0!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
            <div className="country-card">
              <h3>Hotel Alpina</h3>
              <p>Äussere Dorfstrasse 92, 3718 Кандерштег, Швейцария</p>
              <ul className="advantages-list">
                <li>{t('freeParking')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('nonSmokingRooms')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-0TeJaT" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2746.4247393667147!2d7.676210699999998!3d46.499702199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478f067d2e82ff4d%3A0xd66ce4a84c71fc54!2sHotel%20Alpina!5e0!3m2!1sru!2skz!4v1683647847747!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747054523!6m8!1m7!1sCAoSLEFGMVFpcE1sTFlVTDlETHFPaHRNTm85ZllIMWhpYW1fR3VXTUpxRGF2aVNQ!2m2!1d46.500231!2d7.676407999999999!3f96.44309026332218!4f0!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>

            <div className="country-card">
              <h3>Hôtel Le Grand Chalet</h3>
              <p>Chemin de la Source 2, 1854 Лезен, Швейцария</p>
              <ul className="advantages-list">
                <li>{t('freeParking')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('airportTransfer')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('disabledFacilities')}</li>
                <li>{t('bar')}</li>
                <li>{t('excellentBreakfast')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-BRMgDK0" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>

                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2754.1235783287393!2d7.0116944!3d46.3470917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e968a3a2c5d85%3A0x635c7b24bf83878a!2sH%C3%B4tel%20Le%20Grand%20Chalet!5e0!3m2!1sru!2skz!4v1683647898499!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747077844!6m8!1m7!1sCAoSLEFGMVFpcE9HaUc4cjNYNjJ6M2QzZEJmdFV0NERoRkZBTllaLWhsN2s0WjA0!2m2!1d46.34705270358414!2d7.0116641199111855!3f129.71033669849942!4f0!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>

            <div className="country-card">
              <h3>Eurotel Montreux</h3>
              <p>Grand Rue 81, 1820 Монтрё, Швейцария</p>
              <ul className="advantages-list">
                <li>{t('privateParking')}</li>
                <li>{t('spaAndWellnessCenter')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('fitnessCenter')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('roomService')}</li>
                <li>{t('bar')}</li>
                <li>{t('greatBreakfast')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-b0IyNn" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.6012582806698!2d6.9082244!3d46.4367824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e9b1a6d5f26a1%3A0x1e70bc2a09b7b336!2sHotel%20Eurotel!5e0!3m2!1sru!2skz!4v1683647952639!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747150688!6m8!1m7!1sCAoSLEFGMVFpcFA3dUo0Y05qR05tVTBnMTlQQmlQNDc1REFkMlV3TUxoY2ppTE9n!2m2!1d46.43660869327235!2d6.908080892845533!3f47.90316652493166!4f-4.08339097560517!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
            {/* Add other country cards as needed */}

          </div>  </div>
      )}


      {/* Popup for Spain */}
      {selectedCountry && selectedCountry.name === "Spain" && (
        <div className="popup popup-scrollable">
          <div className="popup-header">
            <h3>{selectedCountry.name}</h3>
            <button className="close-button" onClick={handleClosePopup}>
              <span>&times;</span>
            </button>
          </div>
          <div className="popup-content">
            <div className="country-card">
              <h3>Hotel Rural Era de la Corte - Adults only</h3>
              <p>La Corte, 1, 35630 Антигуа, Испания</p>
              <ul className="advantages-list">
                <li>{t('freeWifi')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('freeParking')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-M9Tn6Qm" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.2634648952967!2d-14.011891!3d28.411306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc47bbe4979b70d5%3A0xbd31bb13366331d1!2sHotel%20Rural%20Era%20de%20La%20Corte!5e0!3m2!1sru!2skz!4v1683648222248!5m2!1sru!2skz  "
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747250777!6m8!1m7!1sCAoSLEFGMVFpcE0tbGxZMGpKVDUzOVFua2NhLVJkMWFuMGFPcERmN0ZoNlVDLWVz!2m2!1d28.411244628993167!2d-14.011936383769998!3f195.60382847494316!4f0!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />
              </div>
            </div>

            <div className="country-card">
              <h3>Aparthotel Puerto Cala Vadella</h3>
              <p>Playa de Cala Vadella, 07830 Кала-Ваделья, Испания</p>
              <ul className="advantages-list">
                <li>{t('indoorPool')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('deliveryToRoom')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('bar')}</li>
                <li>{t('amazingBreakfast')}</li>
              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-m1D69T" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.425255817131!2d1.2255243!3d38.9142566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12994b4693eb2127%3A0xd19a14557e6ad359!2sApartaments%20Port%20Cala%20Vadella!5e0!3m2!1sru!2skz!4v1683648308874!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747270477!6m8!1m7!1sCAoSLEFGMVFpcFBDekdHTzVCbldRVEFNMlVZWW44dGVlam5OVFlURWpvcmtPZVdB!2m2!1d38.914198337793!2d1.225313222038!3f70.08269616729446!4f0!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>

            <div className="country-card">
              <h3>hotel finca GA7COLORES only adult</h3>
              <p>Calle el Arroyo 59 Villa los molinos, 35559 Montaña Blanca, Испания</p>
              <ul className="advantages-list">
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('airportShuttle')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('deliveryToRoom')}</li>
                <li>{t('coffeeTeaFacilities')}</li>
                <li>{t('bar')}</li>
                <li>{t('excellentBreakfast')}</li>
              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-90CTqo" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13485442.46643588!2d-19.4739709!3d34.3925924!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc46252e17fcdba3%3A0x4195faaf624d2382!2sGa7colores%20Lanzarote!5e0!3m2!1sru!2skz!4v1683648358201!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747337648!6m8!1m7!1sCAoSLEFGMVFpcE9Fd0stMTRCNXpRYzIybkJyNHlDSXFoRkR1U2U3NzJBQWs5clJU!2m2!1d29.0223682!2d-13.7929929!3f168.16182155513818!4f-8.613785998270245!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
            <div className="country-card">
              <h3>El Time</h3>
              <p>Camino Medel, 3 La Punta - La Costa, 38780 Тихарафе, Испания</p>
              <ul className="advantages-list">

                <li>{t('freeWifi')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('nonSmokingRooms')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-DyYoot" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.8006661537975!2d-17.941660799999998!3d28.6656866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6bf1578515ecd9%3A0x4d4eed55b9c771f5!2zRWwgVGltZSwgMzg3ODAsIFNhbnRhIENydXogZGUgVGVuZXJpZmUsINCY0YHQv9Cw0L3QuNGP!5e0!3m2!1sru!2skz!4v1683648403241!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747502422!6m8!1m7!1sCAoSLEFGMVFpcE1peExtWERQRExSaHlDSmx6NE9lOHpGRE9lZGZaQmJLYXZvM2dr!2m2!1d28.665723!2d-17.9416859!3f304.45452225583705!4f-19.18856904816188!5f0.4000000000000002"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>

            <div className="country-card">
              <h3>Villa Le Blanc, a Gran Meliá Hotel - The Leading Hotels of The World</h3>
              <p>Playa de Santo Tomás s/n, 07749 Санто-Томас, Испания</p>
              <ul className="advantages-list">
                <li>{t('spaAndWellnessCenter')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('deliveryToRoom')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('fitnessCenter')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('bar')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-dtKXT5" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.123582787756!2d4.0369626!3d39.9162505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12be1fd732abf9db%3A0x96a04d304868079b!2sVilla%20Le%20Blanc%2C%20a%20Gran%20Meli%C3%A1%20Hotel%20-%20The%20Leading%20Hotels%20of%20the%20World!5e0!3m2!1sru!2skz!4v1683648443660!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747525944!6m8!1m7!1sCAoSLEFGMVFpcFA4VHRYZ3lic1piYUc3bk1OT215bmw2QlRfVEhpa1pld0l1RDh4!2m2!1d39.9159198!2d4.0365443!3f47.946060778412516!4f0!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup for France */}
      {selectedCountry && selectedCountry.name === "France" && (
        <div className="popup popup-scrollable">
          <div className="popup-header">
            <h3>{selectedCountry.name}</h3>
            <button className="close-button" onClick={handleClosePopup}>
              <span>&times;</span>
            </button>
          </div>
          <div className="popup-content">
            <div className="country-card">
              <h3>Château de Champblanc</h3>
              <p> 12 rue de l abreuvoir Cherves-Richemont, 16370 Cherves-de-Cognac, Франция</p>
              <ul className="advantages-list">
                <li>{t('outdoorPool')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('airportShuttle')}</li>
                <li>{t('deliveryToRoom')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('coffeeTeaFacilities')}</li>
                <li>{t('bar')}</li>
                <li>{t('excellentBreakfast')}</li>
              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-eu9iuR" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.8482205584382!2d-0.3098388999999999!3d45.7541887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4800f27b04a7495f%3A0xcc3d287c8db7d4c9!2sCh%C3%A2teau%20de%20Champblanc!5e0!3m2!1sru!2skz!4v1683648168604!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  Панорамы нет
                </a>
                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />
              </div>
            </div>
            <div className="country-card">
              <h3>Domaine de Montboulard</h3>
              <p>  Montboulard, 16800 Soyaux, Франция</p>
              <ul className="advantages-list">
                <li>{t('outdoorPool')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('excellentBreakfast')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-7xUPKU" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.4896786238482!2d0.2141929!3d45.6409872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fe339e7242f3ff%3A0x6d6de1b4c44f8b4e!2sDomaine%20de%20Montboulard!5e0!3m2!1sru!2skz!4v1683650291152!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  Панорамы нет
                </a>
              </div>
            </div>
            <div className="country-card">
              <h3>Le Petit Parisien - Au Cœur de Montparnasse</h3>
              <p> 14 Rue campagne premiere, 14-й округ: Монпарнас, 75014 Париж, Франция</p>
              <ul className="advantages-list">
                <li>{t('freeWifi')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('elevator')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-x9jgqO" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.978242597674!2d2.3320539999999994!3d48.839553699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671c62637363f%3A0xb34a507bfa666835!2zMTQgUnVlIENhbXBhZ25lIFByZW1pw6hyZSAxNCwgNzUwMTQgUGFyaXMsINCk0YDQsNC90YbQuNGP!5e0!3m2!1sru!2skz!4v1683650388535!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  Панорамы нет
                </a>
              </div>
            </div>
            <div className="country-card">
              <h3>La Cachette du Comte</h3>
              <p> 2 Grande Rue, 83570 Montfort-sur-Argens, Франция</p>
              <ul className="advantages-list">
                <li>{t('freeParking')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('coffeeTeaFacilities')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('excellentBreakfast')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-NSa0m9" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.366887489984!2d6.121782799999999!3d43.473813199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c94332b316aaab%3A0xe93daf1b45e04cf0!2sLa%20cachette%20du%20comte!5e0!3m2!1sru!2skz!4v1683650452605!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747861342!6m8!1m7!1sCAoSLEFGMVFpcE5IMFV5X01iNW9sQjdPaV9vMk1mN3lfT045MEp5dGJWWkR4WTZG!2m2!1d48.83984201704956!2d2.332874327874265!3f196.3055604934138!4f-37.07511313744893!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
            <div className="country-card">
              <h3>Charming loft in Paris marais district</h3>
              <p>147 Rue du Temple, 3-й округ: Маре, 75003 Париж, Франция</p>
              <ul className="advantages-list">
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>

              </ul>
              <div className="button-group">
                <a href="https://www.booking.com/Share-RBikq0" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10499.484343161534!2d2.3363193!3d48.8606686!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1c9bbec273%3A0xa27a9adbdc19545!2sLoft%20in%20the%20marais!5e0!3m2!1sru!2skz!4v1683650487443!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683747888466!6m8!1m7!1sCAoSLEFGMVFpcFBvYXNqelVHUTQwXzJfX1JpOTJ3d21jTk9wOXE0WXZmX2Z5WVFw!2m2!1d48.86057000494!2d2.3542204227018!3f289.2943514314971!4f-11.599057173229937!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
            <div className="popup-scroll">
              {/* Add your content with a large amount of data */}
            </div>
          </div>
        </div>
      )}

      {/* Popup for Italy */}
      {selectedCountry && selectedCountry.name === "Italy" && (

        <div className="popup popup-scrollable">
          <div className="popup-header">
            <h3>{selectedCountry.name}</h3>
            <button className="close-button" onClick={handleClosePopup}>
              <span>&times;</span>
            </button>
          </div>
          <div className="popup-content">
            <div class="country-card">
              <h3>Località Frejusia, 10052 Бардонеккья, Италия</h3>
              <ul class="advantages-list">
                <li>{t('spaAndWellnessCenter')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('skiing')}</li>
                <li>{t('fitnessCenter')}</li>
                <li>{t('bar')}</li>
                <li>{t('amazingBreakfast')}</li>

              </ul>
              <div class="button-group">
                <a href="https://www.booking.com/Share-Sh7CNg" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.0402901779994!2d6.7346753999999995!3d45.0849761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4789eb5c1b677eeb%3A0x51117c3f26b1ef6a!2sSavoia%20Mountain%20Resort!5e0!3m2!1sru!2skz!4v1683650607456!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683748017671!6m8!1m7!1sCAoSLEFGMVFpcFBzVzEyV0RNOFk2WW1DVTdOQm9xWTEyeHJNSzlKRWQ3STJQOU1s!2m2!1d45.08509622111777!2d6.734642616744566!3f348.8200541099121!4f-7.218200628364343!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />
              </div>
            </div>
            <div class="country-card">
              <h3>B&B Hotel La Piana, Via Buggiano Colle 8, 51011 Борго-а-Буджано, Италия</h3>
              <ul class="advantages-list">
                <li>{t('outdoorPool')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('coffeeTeaFacilities')}</li>
                <li>{t('bar')}</li>
                <li>{t('excellentBreakfast')}</li>

              </ul>
              <div class="button-group">
                <a href="https://www.booking.com/Share-mmTc7d" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.0402901779994!2d6.7346753999999995!3d45.0849761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4789eb5c1b677eeb%3A0x51117c3f26b1ef6a!2sSavoia%20Mountain%20Resort!5e0!3m2!1sru!2skz!4v1683647981174!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683748017671!6m8!1m7!1sCAoSLEFGMVFpcFBzVzEyV0RNOFk2WW1DVTdOQm9xWTEyeHJNSzlKRWQ3STJQOU1s!2m2!1d45.08509622111777!2d6.734642616744566!3f348.8200541099121!4f-7.218200628364343!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
            <div class="country-card">
              <h3>Agri Resort & SPA Le Colline del Paradiso, Via del Viliani 756, 50036 Vaglia, Италия</h3>
              <ul class="advantages-list">
                <li>{t('outdoorPool')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('spaAndWellnessCenter')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('bar')}</li>
                <li>{t('greatBreakfast')}</li>

              </ul>
              <div class="button-group">
                <a href="https://www.booking.com/Share-8TrFtR" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2875.4503611130363!2d11.316701300000002!3d43.88793839999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132afe473d98f555%3A0xf5d3589c6e74ac89!2sLe%20Colline%20del%20Paradiso!5e0!3m2!1sru!2skz!4v1683648086650!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  Панорамы нет
                </a>
              </div>

            </div>
            <div class="country-card">
              <h3>Antico Borgo, Via Sassari 7, 08020 Гальтелли, Италия</h3>
              <ul class="advantages-list">
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('airportShuttle')}</li>
                <li>{t('restaurant')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('roomService')}</li>
                <li>{t('disabledFacilities')}</li>
                <li>{t('familyRooms')}</li>
                <li>{t('bar')}</li>
                <li>{t('greatBreakfast')}</li>

              </ul>
              <div class="button-group">
                <a href="https://www.booking.com/Share-1RzRWX" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.0265622969605!2d9.6163369!3d40.386103899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12def2120a6a6883%3A0xc1ab01e5cf4f0f60!2sAlbergo%20Antico%20Borgo!5e0!3m2!1sru!2skz!4v1683648143876!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683748113653!6m8!1m7!1sCAoSLEFGMVFpcE91R2w1Wml2RWdrN0VaQTZ0UzREVGdaT1hyNUtrTnZrdjNaUmZi!2m2!1d40.3860883!2d9.6163416!3f189.86539314559698!4f0!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>
            <div class="country-card">
              <h3>Casa d'Era Country Holiday Houses, Via Bellavista 10, 56030 Лаятико, Италия</h3>
              <ul class="advantages-list">
                <li>{t('outdoorPool')}</li>
                <li>{t('nonSmokingRooms')}</li>
                <li>{t('freeParking')}</li>
                <li>{t('freeWifi')}</li>
                <li>{t('familyRooms')}</li>

              </ul>
              <div class="button-group">
                <a href="https://www.booking.com/Share-SqJ2lQ" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.777527513979!2d10.742747!3d43.486112999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a0eefef1f2865%3A0xdb012d64466cf343!2sCasa%20d&#39;Era%20Country%20Holiday%20Houses!5e0!3m2!1sru!2skz!4v1683648181127!5m2!1sru!2skz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openMapModal(e.target.href);
                  }}
                >
                  {t('View-on-Map')}
                </a>
                <a
  href="https://www.google.com/maps/embed?pb=!4v1683748127208!6m8!1m7!1sCAoSLEFGMVFpcE4yVi0zZjR1NFVubHVyaTVnQWFDUlFDajZXRG9od3VzRGR3Z3hx!2m2!1d43.4857178!2d10.7431456!3f332.9100011014968!4f4.976519488479653!5f0.7820865974627469"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    openMapModal(e.target.href);
  }}
>
  Панорама
</a>

              </div>
            </div>

            <div className="popup-scroll">
              {/* Add your content with a large amount of data */}
            </div>
          </div>
        </div>
      )}
    </div>);
};
export default withTranslation()(EuropeMap);