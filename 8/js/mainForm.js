import {initSlider} from './noUiSlider.js';
import {disableElements, enableElements} from './utils.js';

const form = document.querySelector('#main-form');
const capacityField = form.querySelector('#capacity');
const roomsField = form.querySelector('[name="rooms"]');
const submitBtn = form.querySelector('[type="submit"');
const resetBtn = form.querySelector('[type="reset"');
const MAX_CAPACITY_AMOUNT = {
  '0':100,
  '1': 1,
  '2': 2,
  '3': 3,
};

const priceInput = form.querySelector('#price');
const sliderElement = form.querySelector('#price-slider');

const priceInputOptions = {
  range: {
    min: Number(priceInput.min),
    max: Number(priceInput.max),
  },
  start: Number(priceInput.dataset.start),
  step: Number(priceInput.dataset.step),
  connect: 'lower',
};

initSlider(sliderElement, priceInputOptions);
priceInput.addEventListener('change', onPriceInputChange);

sliderElement.noUiSlider.on('update', () => {
  priceInput.value = sliderElement.noUiSlider.get();
});

function onPriceInputChange(evt){
  sliderElement.noUiSlider.set(evt.target.value);
}

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent:'ad-form__element',
});

pristine.addValidator(
  capacityField,
  validateCapacity,
  'The value is not corresponding rooms number'
);

const mainFormHandler = ()=>{
  form.addEventListener('submit', submitHandler);
  roomsField.addEventListener('change', ()=>{
    pristine.validate(capacityField);
  });
};

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

function submitHandler(evt){
  evt.preventDefault();
  disableElements([submitBtn, resetBtn]);

  const formIsValid = pristine.validate();
  if(formIsValid){
    enableElements([submitBtn, resetBtn]);
  }
}

export {mainFormHandler};
