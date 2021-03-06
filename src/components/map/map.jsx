import React, {useEffect, useRef, memo} from 'react';
import PropTypes from "prop-types";
import leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";
import {useSelector} from "react-redux";

const Map = ({offerList, style}) => {
  const {city} = useSelector((state) => state.CITY);
  const {activeOfferId} = useSelector((state) => state.ACTIVE_OFFER);
  const mapRef = useRef();
  const cityInfo = offerList.find((e) => e.city.location).city;
  const {location} = cityInfo;

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: location.latitude,
        lng: location.longitude
      },
      zoom: location.zoom,
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    offerList.forEach((offer) => {
      const isActivePin = +activeOfferId === offer.id ? `./img/pin-active.svg` : `./img/pin.svg`;
      const customIcon = leaflet.icon({
        iconUrl: isActivePin,
        iconSize: [27, 39]
      });

      leaflet.marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      },
      {
        icon: customIcon
      })
        .addTo(mapRef.current)
        .bindPopup(offer.title);
    });
    return () => {
      mapRef.current.remove();
    };
  }, [city, activeOfferId]);

  return (
    <div id="map" style={style}/>
  );
};

Map.propTypes = {
  offerList: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
};

export default memo(Map);
