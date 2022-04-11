import {isInRange, debounce} from './utils.js';
import {updateMarkers, closePopups, getOffers} from './map.js';

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

const clearFilters = ()=>{
  filtersForm.reset();
};
const getFiltersForm = ()=>({
  element: filtersForm,
  selector: '.map__filters'
});

typeField.addEventListener('change', debounce(filterOffers, 500));
priceField.addEventListener('change', debounce(filterOffers, 500));
roomsField.addEventListener('change', debounce(filterOffers, 500));
guestsField.addEventListener('change', debounce(filterOffers, 500));
filtersCheckboxesField.addEventListener('change', debounce(filterOffers, 500));

function filterOffers(){
  closePopups();
  const offers = getOffers();
  const filteredOffers = offers.slice().filter(({offer}) => {
    const offerHasSelectedType = typeField.value === 'any' || offer.type === typeField.value;
    const offerHasSelectedPrice = priceField.value === 'any' || isInRange(offer.price, priceRanges[priceField.value].min, priceRanges[priceField.value].max);
    const offerHasSelectedRooms = roomsField.value === 'any' || offer.rooms === Number(roomsField.value);
    const offerHasSelectedGuests = guestsField.value === 'any' || offer.guests === Number(guestsField.value);
    const checkedFeatures = filtersCheckboxes.map((item)=>{
      if(item.checked){
        return item.value;
      }
    });

    if(offerHasSelectedType && offerHasSelectedPrice && offerHasSelectedRooms && offerHasSelectedGuests && offerHasFeatures(offer.features, checkedFeatures)) {
      return offer;
    }
  });

  updateMarkers(filteredOffers);
}
function offerHasFeatures(offerFeatures, checkedFeatures){
  return offerFeatures && offerFeatures.length && checkedFeatures.length && checkedFeatures.filter((feature)=>feature).every((item)=> offerFeatures.includes(item));
}

export {clearFilters, getFiltersForm};
