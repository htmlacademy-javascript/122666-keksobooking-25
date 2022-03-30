import {activatePage} from './page-state-controller.js';
import {getData} from './api.js';
import {createOfferElement} from './create-similar-offers.js';


const TOKIO_COORDS = {
  lat: 35.6894,
  lng: 139.692,
};
const PINS_NUMBER = 5;
const OFFERS_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
const adressTargetElm = document.querySelector('#address');

const createMap = () => {
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
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  getData(OFFERS_DATA_LINK, onSuccess, onError);
  function onSuccess(data){
    data = data.slice(0, PINS_NUMBER);
    data.forEach((offer) => {
      const marker = createMarker(offer.location, pinIcon);
      marker
        .addTo(map)
        .bindPopup(createOfferElement(offer));
    });
  }
  function onError(err){
    const errorElm = document.createElement('div');
    errorElm.style.position = 'fixed';
    errorElm.style.top = 0;
    errorElm.style.left = 0;
    errorElm.style.backgroundColor = 'rgba(255,0,0,0.5)';
    errorElm.style.color = '#fff';
    errorElm.style.fontSize = '16px';
    errorElm.style.fontWeight = '500';
    errorElm.style.textAlign = 'center';
    errorElm.style.padding = '8px 16px';
    errorElm.style.width = '100%';
    errorElm.textContent = err;
    document.body.insertAdjacentElement('afterbegin', errorElm);
    setTimeout(() => {
      errorElm.remove();
    }, 5000);
  }
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
