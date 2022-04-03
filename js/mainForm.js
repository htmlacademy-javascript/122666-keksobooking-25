import {initSlider} from './noUiSlider.js';
import {disableElements, enableElements} from './utils.js';
import {sendData} from './api.js';
import {resetMap, resetAddresField} from './createMap.js';
import {clearFilters} from './filters.js';

const form = document.querySelector('#main-form');
const capacityField = form.querySelector('#capacity');
const roomsField = form.querySelector('[name="rooms"]');
const submitBtn = form.querySelector('[type="submit"]');
const resetBtn = form.querySelector('[type="reset"]');
const MAX_CAPACITY_AMOUNT = {
  '0':100,
  '1': 1,
  '2': 2,
  '3': 3,
};
const FORM_ACTION = 'https://25.javascript.pages.academy/keksobooking';
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

const successMessageTemplate = document.querySelector('#success');
const successMessageElm = successMessageTemplate.content.querySelector('.success').cloneNode(true);
const errorMessageTemplate = document.querySelector('#error');
const errorMessageElm = errorMessageTemplate.content.querySelector('.error').cloneNode(true);
const errorMessageTarget = errorMessageElm.querySelector('.error__message');

const avatarField = form.querySelector('#avatar');
const titleField = form.querySelector('#title');
const typeField = form.querySelector('#type');
const featuresCheckboxes = form.querySelectorAll('.features__checkbox');
const timeinField = form.querySelector('#timein');
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
    elm: timeinField,
    value: timeinField.value
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


resetBtn.addEventListener('click', resetHandler);

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
  sliderElement.noUiSlider.updateOptions(priceInputOptions);
  resetAddresField();
}

function onSuccess(){
  enableElements([submitBtn, resetBtn]);
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
