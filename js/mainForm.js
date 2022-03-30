import {initSlider} from './noUiSlider.js';
import {disableElements, enableElements} from './utils.js';

const form = document.querySelector('#main-form');
const capacityField = form.querySelector('#capacity');
const priceField = form.querySelector('#price');
const sliderElement = form.querySelector('#price-slider');
const typeField = form.querySelector('#type');
const roomsField = form.querySelector('[name="rooms"]');
const timeInField = form.querySelector('[name="timein"]');
const timeOutField = form.querySelector('[name="timeout"]');
const submitBtn = form.querySelector('[type="submit"]');
const resetBtn = form.querySelector('[type="reset"]');
const MAX_CAPACITY_AMOUNT = {
  '0':100,
  '1': 1,
  '2': 2,
  '3': 3,
};
const MIN_TYPE_PRICE_AMOUNT = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent:'ad-form__element',
});

const mainFormHandler = ()=>{
  form.addEventListener('submit', submitHandler);
  sliderElement.noUiSlider.on('update', () => {
    priceField.value = sliderElement.noUiSlider.get();
    pristine.validate(priceField);
  });
  roomsField.addEventListener('change', ()=>{
    pristine.validate(capacityField);
  });
  priceField.addEventListener('change', onPriceFieldChange);
  typeField.addEventListener('change', onTypeFieldChange);
  timeInField.addEventListener('change', ()=> {
    changeDependentField(timeOutField, timeInField.value);
  });
  timeOutField.addEventListener('change', ()=> {
    changeDependentField(timeInField, timeOutField.value);
  });
};

initSlider(sliderElement, {
  range: {
    min: Number(priceField.min),
    max: Number(priceField.max),
  },
  start: Number(priceField.dataset.start),
  step: Number(priceField.dataset.step),
  connect: 'lower',
});

pristine.addValidator(
  capacityField,
  validateCapacity,
  'The value is not corresponding rooms number'
);
pristine.addValidator(
  priceField,
  validatePrice,
  'The value and selected type are not corresponding'
);

function onPriceFieldChange(evt){
  sliderElement.noUiSlider.set(evt.target.value);

}

function onTypeFieldChange(evt){
  const minPrice = MIN_TYPE_PRICE_AMOUNT[evt.target.value];
  priceField.placeholder = minPrice;
}

function validateCapacity(value){
  const roomsFieldValue = Number(roomsField.value);
  const capacityValue = parseInt(value, 10);
  const maxRoomsAmount = MAX_CAPACITY_AMOUNT[capacityValue];
  if(capacityValue>0){
    return value.length && roomsFieldValue >= maxRoomsAmount && roomsFieldValue !== MAX_CAPACITY_AMOUNT[0];
  } else if(capacityValue===0) {
    return roomsFieldValue === maxRoomsAmount;
  }
}

function validatePrice(value){
  const typeFieldValue = typeField.value;
  const priceValue = parseInt(value, 10);
  const minPrice = MIN_TYPE_PRICE_AMOUNT[typeFieldValue];
  return priceValue >= minPrice;
}

function changeDependentField(field, value){
  if(field.value !== value){
    field .value = value;
  }
}

function submitHandler(evt){
  evt.preventDefault();
  disableElements([submitBtn, resetBtn]);

  const formIsValid = pristine.validate();
  if(formIsValid){
    enableElements([submitBtn, resetBtn]);
  }
}

export {mainFormHandler};
