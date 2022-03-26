import {activatePage} from './page-state-controller.js';
import {getOffers} from './get-offers.js';
import {getOfferElement} from './create-similar-offers.js';

const TOKIO_COORDS = {
  lat: 35.6894,
  lng: 139.692,
};
const adressTargetElm = document.querySelector('#address');
const createMap = ()=> {
  const map = L.map('map-canvas')
    .on('load', () => {
      activatePage();
    })
    .setView(TOKIO_COORDS, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinMarker = L.marker(
    TOKIO_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  adressTargetElm.value = `${TOKIO_COORDS.lat.toFixed(5)}, ${TOKIO_COORDS.lng.toFixed(5)}`;

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    adressTargetElm.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
  });

  const offers = getOffers();

  offers.forEach((offer) => {
    const marker = createMarker(offer.location, pinIcon);

    marker
      .addTo(map)
      .bindPopup(getOfferElement(offer));
  });
};


function createMarker(location, icon){
  return L.marker({
    lat:location.lat,
    lng:location.lng,
  },
  {
    icon
  });
}

export {createMap};
