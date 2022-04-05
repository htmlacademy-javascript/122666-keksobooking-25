import {activatePage} from './page-state-controller.js';
import {getData} from './api.js';
import {createOfferElement} from './create-similar-offers.js';
import {isInRange} from './utils.js';
const filtersForm = document.querySelector('.map__filters');
const typeField = filtersForm.querySelector('#housing-type');
const priceField = filtersForm.querySelector('#housing-price');
const roomsField = filtersForm.querySelector('#housing-rooms');
const guestsField = filtersForm.querySelector('#housing-guests');
const filtersCheckboxes = filtersForm.querySelectorAll('.map__checkbox');
const filtersFields = [
  {
    elm: typeField,
    initialValue: typeField.value
  },
  {
    elm: priceField,
    initialValue: priceField.value
  },
  {
    elm: roomsField,
    initialValue: roomsField.value
  },
  {
    elm: guestsField,
    initialValue: guestsField.value
  },
];

const priceRanges = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min:10000,
    max: 49999,
  },
  high: {
    min:50000,
    max: 500000
  }
};

const clearFilters = ()=>{
  filtersFields.forEach((field)=>{
    field.elm.value = field.initialValue;
  });
  filtersCheckboxes.forEach((checkbox)=>{
    checkbox.checked = false;
  });
};

const TOKIO_COORDS = {
  lat: 35.6894,
  lng: 139.692,
};
const PINS_NUMBER = 10;
const MAP_ZOOM_INDEX = 12;
const OFFERS_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
const adressTargetElm = document.querySelector('#address');
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

let map, mainPinMarker, markersLayer, offers;

typeField.addEventListener('change', ()=>{
  const sortedOffers = offers.slice().sort(compareOffers);
  updateMarkers(sortedOffers);
});
priceField.addEventListener('change', ()=>{
  const sortedOffers = offers.slice().sort(compareOffers);
  updateMarkers(sortedOffers);
});

const createMap = () => {
  map = L.map('map-canvas')
    .on('load', () => {
      activatePage();
    })
    .setView(TOKIO_COORDS, MAP_ZOOM_INDEX);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker = L.marker(
    TOKIO_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    adressTargetElm.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
  });

  adressTargetElm.value = `${TOKIO_COORDS.lat.toFixed(5)}, ${TOKIO_COORDS.lng.toFixed(5)}`;

  markersLayer = L.layerGroup().addTo(map);
  getData(OFFERS_DATA_LINK, onSuccess, onError);
};

function onSuccess(data){
  offers = data;
  updateMarkers(offers);
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

function updateMarkers(data){
  clearMarkers();
  const offerToShow = data.slice(0, PINS_NUMBER);
  offerToShow.forEach((offer) => {
    addMarker(offer);
  });
}

function addMarker(data){
  const marker = createMarker(data.location, pinIcon);
  marker
    .addTo(markersLayer)
    .bindPopup(createOfferElement(data));

}

function createMarker(location, icon){
  return L.marker({
    lat:location.lat,
    lng:location.lng,
  },
  {
    icon
  });
}

const resetAddresField = ()=>{
  adressTargetElm.value = `${TOKIO_COORDS.lat}, ${TOKIO_COORDS.lng}`;
};

const resetMap = ()=>{
  map.closePopup();
  mainPinMarker.setLatLng(TOKIO_COORDS);
  map.setView(TOKIO_COORDS, MAP_ZOOM_INDEX);
  resetAddresField();
};

function clearMarkers(){
  markersLayer.clearLayers();
}

function compareOffers(offerA, offerB){
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);
  return rankB - rankA;
}
function getOfferRank(offer){
  let rank = 0;
  if(typeField.value === offer.offer.type){
    rank+=1;
  } else if(typeField.value === 'any'){
    rank-=1;
  }

  return rank;
}
export {createMap, resetMap, resetAddresField, clearFilters};
