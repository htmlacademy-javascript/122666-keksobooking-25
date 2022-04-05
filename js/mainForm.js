import {initSlider} from './noUiSlider.js';
import {disableElements, enableElements} from './utils.js';
import {sendData} from './api.js';
import {resetMap, resetAddresField, clearFilters} from './createMap.js';

const form = document.querySelector('#main-form');

const avatarField = form.querySelector('#avatar');
const titleField = form.querySelector('#title');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeInField = form.querySelector('[name="timein"]');
const timeOutField = form.querySelector('[name="timeout"]');
const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('#capacity');
const featuresCheckboxes = form.querySelectorAll('.features__checkbox');
const descriptionField = form.querySelector('#description');
const imagesField = form.querySelector('#images');

const formFields = [
  {
    elm: avatarField,
    value: avatarField.value
  },
  {
    elm: titleField,
    value: titleField.value
  },
  {
    elm: typeField,
    value: typeField.value
  },
  {
    elm: timeInField,
    value: timeInField.value
  },
  {
    elm: timeOutField,
    value: timeOutField.value
  },
  {
    elm: roomsField,
    value: roomsField.value
  },
  {
    elm: capacityField,
    value: capacityField.value
  },
  {
    elm: descriptionField,
    value: descriptionField.value
  },
  {
    elm: imagesField,
    value: imagesField.value
  },
];

const sliderElement = form.querySelector('#price-slider');
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
const FORM_ACTION = 'https://25.javascript.pages.academy/keksobooking';

const priceFieldOptions = {
  range: {
    min: Number(priceField.min),
    max: Number(priceField.max),
  },
  start: Number(priceField.dataset.start),
  step: Number(priceField.dataset.step),
  connect: 'lower',
};

const successMessageTemplate = document.querySelector('#success');
const successMessageElm = successMessageTemplate.content.querySelector('.success').cloneNode(true);
const errorMessageTemplate = document.querySelector('#error');
const errorMessageElm = errorMessageTemplate.content.querySelector('.error').cloneNode(true);
const errorMessageTarget = errorMessageElm.querySelector('.error__message');

initSlider(sliderElement, priceFieldOptions);

resetBtn.addEventListener('click', resetHandler);
priceField.addEventListener('change', onPriceInputChange);


sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

function onPriceInputChange(evt){
  sliderElement.noUiSlider.set(evt.target.value);
}

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
  const formIsValid = pristine.validate();
  if(formIsValid){
    disableElements([submitBtn, resetBtn]);
    sendData(
      FORM_ACTION,
      () => onSuccess(),
      (err) => onError(err),
      new FormData(evt.target)
    );
  }
}

function resetHandler(evt){
  if(evt) {
    evt.preventDefault();
  }
  resetMap();
  clearFilters();
  resetMainForm();
}

function resetMainForm(){
  formFields.forEach((field) => {
    field.elm.value = field.value;
  });
  featuresCheckboxes.forEach((checkbox)=>{
    checkbox.checked = false;
  });
  sliderElement.noUiSlider.updateOptions(priceFieldOptions);
  resetAddresField();
}

function onSuccess(){
  enableElements([submitBtn, resetBtn]);
  resetBtn.click();
  showMessage('success');
}
function onError(err){
  enableElements([submitBtn, resetBtn]);
  showMessage('error', err);
}

function showMessage(type, message){
  if(type === 'success') {
    document.addEventListener('keydown', closeSuccessMessage);
    document.body.addEventListener('click', closeSuccessMessage);
    document.body.insertAdjacentElement('beforeend', successMessageElm);
  } else {
    document.addEventListener('keydown', closeErrorMessage);
    document.body.addEventListener('click', closeErrorMessage);
    errorMessageTarget.innerText = message;
    document.body.insertAdjacentElement('beforeend', errorMessageElm);
  }
}
function closeSuccessMessage(evt) {
  if(evt.key === 'Escape' || evt.type === 'click') {
    successMessageElm.remove();
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', closeSuccessMessage);
  }
}
function closeErrorMessage(evt) {
  if(evt.key === 'Escape' || evt.type === 'click') {
    errorMessageElm.remove();
    document.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keydown', closeErrorMessage);
  }
}

export {mainFormHandler};
