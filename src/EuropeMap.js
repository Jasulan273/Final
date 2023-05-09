import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import countriesData from "./countriesData";
import "./Map.css";
import { withTranslation } from 'react-i18next';
import './18n';
import Modal from 'react-modal';


const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

const EuropeMap = () => {
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
                <li>Бесплатная парковка</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Номера для некурящих</li>
                <li>Хороший завтрак</li>
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
                  View on Map
                </a>

                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />

                <GoogleMapModal mapUrl="" />

              </div>
            </div>

            <div className="country-card">
              <h3>City Hotel Biel Bienne</h3>
              <p>Aarbergstrasse 29, 2502 Биль, Швейцария</p>
              <ul className="advantages-list">
                <li>Бесплатная парковка</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Номера для некурящих</li>
                <li>Кофеварка/чайник во всех номерах</li>
                <li>Очень хороший завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>

            <div className="country-card">
              <h3>Dorint Blüemlisalp Beatenberg/Interlaken</h3>
              <p>Schmockenstrasse 163, 3803 Беатенберг, Швейцария</p>
              <ul className="advantages-list">
                <li>Крытый бассейн</li>
                <li>Спа и оздоровительный центр</li>
                <li>Бесплатная парковка</li>
                <li>Семейные номера</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Номера для некурящих</li>
                <li>Ресторан</li>
                <li>Фитнес-центр</li>
                <li>Бар</li>
                <li>Потрясающий завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>
            <div className="country-card">
              <h3>Hotel Alpina</h3>
              <p>Äussere Dorfstrasse 92, 3718 Кандерштег, Швейцария</p>
              <ul className="advantages-list">
                <li>Бесплатная парковка</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Номера для некурящих</li>
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
                  View on Map
                </a>
              </div>
            </div>

            <div className="country-card">
              <h3>Hôtel Le Grand Chalet</h3>
              <p>Chemin de la Source 2, 1854 Лезен, Швейцария</p>
              <ul className="advantages-list">
                <li>Бесплатная парковка</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Номера для некурящих</li>
                <li>Трансфер от/до аэропорта</li>
                <li>Ресторан</li>
                <li>Удобства для гостей с ограниченными физическими возможностями</li>
                <li>Бар</li>
                <li>Превосходный завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>

            <div className="country-card">
              <h3>Eurotel Montreux</h3>
              <p>Grand Rue 81, 1820 Монтрё, Швейцария</p>
              <ul className="advantages-list">
                <li>Частная парковка</li>
                <li>Спа и оздоровительный центр</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Ресторан</li>
                <li>Фитнес-центр</li>
                <li>Номера для некурящих</li>
                <li>Доставка еды и напитков в номер</li>
                <li>Бар</li>
                <li>Очень хороший завтрак</li>
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
                  View on Map
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
                <li>Бесплатный Wi-Fi</li>
                <li>Номера для некурящих</li>
                <li>Бесплатная парковка</li>
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
                  View on Map
                </a>

                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />
              </div>
            </div>

            <div className="country-card">
              <h3>Aparthotel Puerto Cala Vadella</h3>
              <p>Playa de Cala Vadella, 07830 Кала-Ваделья, Испания</p>
              <ul className="advantages-list">
                <li>Открытый бассейн</li>
                <li>Пляж (первая линия)</li>
                <li>Семейные номера</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Номера для некурящих</li>
                <li>Доставка еды и напитков в номер</li>
                <li>Ресторан</li>
                <li>Бар</li>
                <li>Потрясающий завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>

            <div className="country-card">
              <h3>hotel finca GA7COLORES only adult</h3>
              <p>Calle el Arroyo 59 Villa los molinos, 35559 Montaña Blanca, Испания</p>
              <ul className="advantages-list">
                <li>Открытый бассейн</li>
                <li>Номера для некурящих</li>
                <li>Трансфер от/до аэропорта (бесплатный)</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Бесплатная парковка</li>
                <li>Ресторан</li>
                <li>Доставка еды и напитков в номер</li>
                <li>Кофеварка/чайник во всех номерах</li>
                <li>Бар</li>
                <li>Великолепный завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>
            <div className="country-card">
              <h3>El Time</h3>
              <p>Camino Medel, 3 La Punta - La Costa, 38780 Тихарафе, Испания</p>
              <ul className="advantages-list">
                <li>Открытый бассейн</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Бесплатная парковка</li>
                <li>Номера для некурящих</li>
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
                  View on Map
                </a>
              </div>
            </div>

            <div className="country-card">
              <h3>Villa Le Blanc, a Gran Meliá Hotel - The Leading Hotels of The World</h3>
              <p>Playa de Santo Tomás s/n, 07749 Санто-Томас, Испания</p>
              <ul className="advantages-list">
                <li>Открытый бассейн</li>
                <li>Спа и оздоровительный центр</li>
                <li>Номера для некурящих</li>
                <li>Пляж (первая линия)</li>
                <li>Доставка еды и напитков в номер</li>
                <li>Ресторан</li>
                <li>Фитнес-центр</li>
                <li>Семейные номера</li>
                <li>Бар</li>
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
                  View on Map
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
                <li>Открытый бассейн</li>
                <li>Ресторан</li>
                <li>Номера для некурящих</li>
                <li>Трансфер от/до аэропорта (бесплатный)</li>
                <li>Доставка еды и напитков в номер</li>
                <li>Бесплатная парковка</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Кофеварка/чайник во всех номерах</li>
                <li>Бар</li>
                <li>Превосходный завтрак</li>
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
                  View on Map
                </a>
                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />
              </div>
            </div>
            <div className="country-card">
              <h3>Domaine de Montboulard</h3>
              <p>  Montboulard, 16800 Soyaux, Франция</p>
              <ul className="advantages-list">
                <li>Открытый бассейн</li>
                <li>Номера для некурящих</li>
                <li>Бесплатная парковка</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Превосходный завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>
            <div className="country-card">
              <h3>Le Petit Parisien - Au Cœur de Montparnasse</h3>
              <p> 14 Rue campagne premiere, 14-й округ: Монпарнас, 75014 Париж, Франция</p>
              <ul className="advantages-list">
                <li>Бесплатный Wi-Fi</li>
                <li>Номера для некурящих</li>
                <li>Лифт</li>
                <li>Отопление</li>
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
                  View on Map
                </a>
              </div>
            </div>
            <div className="country-card">
              <h3>La Cachette du Comte</h3>
              <p> 2 Grande Rue, 83570 Montfort-sur-Argens, Франция</p>
              <ul className="advantages-list">
                <li>Бесплатная парковка</li>
                <li>Номера для некурящих</li>
                <li>Кофеварка/чайник во всех номерах</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Превосходный завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>
            <div className="country-card">
              <h3>Charming loft in Paris marais district</h3>
              <p>147 Rue du Temple, 3-й округ: Маре, 75003 Париж, Франция</p>
              <ul className="advantages-list">
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
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
                  View on Map
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
                <li>2 бассейна</li>
                <li>Спа и оздоровительный центр</li>
                <li>Бесплатная парковка</li>
                <li>Семейные номера</li>
                <li>Ресторан</li>
                <li>Катание на лыжах</li>
                <li>Фитнес-центр</li>
                <li>Бар</li>
                <li>Потрясающий завтрак</li>
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
                  View on Map
                </a>
                <GoogleMapModal mapUrl={mapUrl} closeModal={closeModal} />
              </div>
            </div>
            <div class="country-card">
              <h3>B&B Hotel La Piana, Via Buggiano Colle 8, 51011 Борго-а-Буджано, Италия</h3>
              <ul class="advantages-list">
                <li>Открытый бассейн</li>
                <li>Бесплатная парковка</li>
                <li>Номера для некурящих</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Кофеварка/чайник во всех номерах</li>
                <li>Бар</li>
                <li>Превосходный завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>
            <div class="country-card">
              <h3>Agri Resort & SPA Le Colline del Paradiso, Via del Viliani 756, 50036 Vaglia, Италия</h3>
              <ul class="advantages-list">
                <li>Открытый бассейн</li>
                <li>Бесплатнаяпарковка</li>
                <li>Ресторан</li>
                <li>Номера для некурящих</li>
                <li>Спа и оздоровительный центр</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
                <li>Бар</li>
                <li>Очень хороший завтрак</li>
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
                  View on Map
                </a>
              </div>

            </div>
            <div class="country-card">
              <h3>Antico Borgo, Via Sassari 7, 08020 Гальтелли, Италия</h3>
              <ul class="advantages-list">
                <li>Номера для некурящих</li>
                <li>Трансфер от/до аэропорта</li>
                <li>Ресторан</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Бесплатная парковка</li>
                <li>Доставка еды и напитков в номер</li>
                <li>Удобства для гостей с ограниченными физическими возможностями</li>
                <li>Семейные номера</li>
                <li>Бар</li>
                <li>Хороший завтрак</li>
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
                  View on Map
                </a>
              </div>
            </div>
            <div class="country-card">
              <h3>Casa d'Era Country Holiday Houses, Via Bellavista 10, 56030 Лаятико, Италия</h3>
              <ul class="advantages-list">
                <li>Открытый бассейн</li>
                <li>Номера для некурящих</li>
                <li>Бесплатная парковка</li>
                <li>Бесплатный Wi-Fi</li>
                <li>Семейные номера</li>
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
                  View on Map
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