import {isInRange, debounce} from './utils.js';
import {updateMarkers, map, offers} from './createMap.js';

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
const filtersForm = document.querySelector('.map__filters');
const typeField = filtersForm.querySelector('#housing-type');
const priceField = filtersForm.querySelector('#housing-price');
const roomsField = filtersForm.querySelector('#housing-rooms');
const guestsField = filtersForm.querySelector('#housing-guests');
const filtersCheckboxes = Array.from(filtersForm.querySelectorAll('.map__checkbox'));
const filtersCheckboxesField = filtersForm.querySelector('#housing-features');
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

const clearFilters = ()=>{
  filtersFields.forEach((field)=>{
    field.elm.value = field.initialValue;
  });
  filtersCheckboxes.forEach((checkbox)=>{
    checkbox.checked = false;
  });
};

typeField.addEventListener('change', debounce(filterOffers, 500));
priceField.addEventListener('change', debounce(filterOffers, 500));
roomsField.addEventListener('change', debounce(filterOffers, 500));
guestsField.addEventListener('change', debounce(filterOffers, 500));
filtersCheckboxesField.addEventListener('change', debounce(filterOffers, 500));

function filterOffers(){
  map.closePopup();
  const filteredOffers = offers.slice().filter(({offer}) => {
    const offerIsTypeOf = typeField.value === 'any' || offer.type === typeField.value;
    const offerIsPriceOF = priceField.value === 'any' || isInRange(offer.price, priceRanges[priceField.value].min, priceRanges[priceField.value].max);
    const offerIsRoomsOf = roomsField.value === 'any' || offer.rooms === Number(roomsField.value);
    const offerIsGuestsOf = guestsField.value === 'any' || offer.guests === Number(guestsField.value);
    const checkedFeatures = filtersCheckboxes.map((item)=>{
      if(item.checked){
        return item.value;
      }
    });
    const offerHasFeatures = hasOfferFeatures(offer.features, checkedFeatures);

    if(offerIsTypeOf && offerIsPriceOF && offerIsRoomsOf && offerIsGuestsOf && offerHasFeatures) {
      return offer;
    }
  });

  updateMarkers(filteredOffers);
}

function hasOfferFeatures(offerFeatures, checkedFeatures){
  return offerFeatures && offerFeatures.length && checkedFeatures.length && checkedFeatures.filter((feature)=>feature).every((item)=> offerFeatures.includes(item));
}

export {clearFilters};

