import {activatePage} from './page-state-controller.js';
import {getData} from './api.js';
import {createOfferElement} from './create-similar-offers.js';
import {setAddressValue} from './mainForm.js';

const INITIAL_COORDS = {
  lat: 35.6894,
  lng: 139.692,
};
const PINS_NUMBER = 10;
const MAP_ZOOM_INDEX = 12;
const OFFERS_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
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

const createMap = () => {
  initLeafletMap();
  addTilesToMap();
  addMainMarker();
  addSimilarMarkersLayer();
  setAddressValue();
  getData(OFFERS_DATA_LINK, onGetDataSuccess, onGetDataError);
};
const updateMarkers = (data)=>{
  clearMarkers();
  const offerToShow = data.slice(0, PINS_NUMBER);
  offerToShow.forEach((offer) => {
    addMarker(offer);
  });
};
const resetMap = ()=>{
  map.closePopup();
  mainPinMarker.setLatLng(INITIAL_COORDS);
  map.setView(INITIAL_COORDS, MAP_ZOOM_INDEX);
  updateMarkers(offers);
  setAddressValue();
};

function initLeafletMap(){
  map = L.map('map-canvas')
    .on('load', () => {
      activatePage();
    })
    .setView(INITIAL_COORDS, MAP_ZOOM_INDEX);
}

function addTilesToMap(){
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

function addMainMarker(){
  mainPinMarker = L.marker(
    INITIAL_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    setAddressValue(evt.target.getLatLng());
  });
}

function addSimilarMarkersLayer(){
  markersLayer = L.layerGroup().addTo(map);
}

function onGetDataSuccess(data){
  offers = data;
  updateMarkers(offers);
}

function onGetDataError(err){
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

function clearMarkers(){
  markersLayer.clearLayers();
}

export {createMap, resetMap, updateMarkers, INITIAL_COORDS ,map, offers};
