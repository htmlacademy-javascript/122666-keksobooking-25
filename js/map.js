import {enableForm} from './page-state-controller.js';
import {getData} from './api.js';
import {createOfferElement} from './create-similar-offers.js';
import {setAddressValue, initMainForm, getMainForm} from './main-form.js';
import {getFiltersForm} from './filters.js';

const ERROR_STYLES = {
  position:'fixed',
  top:0,
  left:0,
  backgroundColor:'rgba(255,0,0,0.8)',
  color:'#fff',
  fontSize:'16px',
  fontWeight:'500',
  textAlign:'center',
  padding:'8px 16px',
  width:'100%'
};
const INITIAL_COORDINATES = {
  lat: 35.6894,
  lng: 139.692,
};
const PINS_NUMBER = 10;
const MAP_ZOOM_INDEX = 12;
const OFFERS_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
const ERROR_TEXT = 'Упс! Не удалось получить похожие объявления! Попробуйте позже.';
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

const createMap = ()=>{
  initLeafletMap();
  addTilesToMap();
  addMainMarker();
  addSimilarMarkersLayer();
  setAddressValue();
};
const closePopups = ()=>{
  map.closePopup();
};
const updateMarkers = (data)=>{
  clearMarkers();
  const offerToShow = data.slice(0, PINS_NUMBER);
  offerToShow.forEach((offer) => {
    addMarker(offer);
  });
};
const resetMap = ()=>{
  closePopups();
  mainPinMarker.setLatLng(INITIAL_COORDINATES);
  map.setView(INITIAL_COORDINATES, MAP_ZOOM_INDEX);
  updateMarkers(offers);
};
const getOffers = ()=>offers;

function initLeafletMap(){
  map = L.map('map-canvas')
    .on('load', onMapLoad)
    .setView(INITIAL_COORDINATES, MAP_ZOOM_INDEX);
}
function onMapLoad(){
  getData(OFFERS_DATA_LINK, onGetDataSuccess, onGetDataError);
  initMainForm();
  const mainForm = getMainForm();
  enableForm(mainForm);
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
    INITIAL_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);
  mainPinMarker.on('drag', (evt) => {
    setAddressValue(evt.target.getLatLng());
  });
}
function addSimilarMarkersLayer(){
  markersLayer = L.layerGroup().addTo(map);
}
function onGetDataSuccess(data){
  offers = data;
  updateMarkers(offers);
  const filtersForm = getFiltersForm();
  enableForm(filtersForm);
}
function onGetDataError(){
  const errorElement = document.createElement('div');
  Object.assign(errorElement.style, ERROR_STYLES);
  errorElement.textContent = ERROR_TEXT;
  document.body.insertAdjacentElement('afterbegin', errorElement);
  setTimeout(() => {
    errorElement.remove();
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

export {createMap, resetMap, updateMarkers, closePopups, getOffers, INITIAL_COORDINATES};
