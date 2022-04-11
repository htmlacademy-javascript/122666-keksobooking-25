import {disableElements, enableElements} from './utils.js';
import {sendData} from './api.js';
import {resetMap, INITIAL_COORDINATES} from './map.js';
import {clearFilters} from './filters.js';
import {addImagePreview, removePreviews} from './choose-image.js';
import {initPristine, validateForm, validateField} from './validation.js';

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
const ERROR_MESSAGE = 'Не удалось отправить данные';
const form = document.querySelector('#main-form');
const avatarField = form.querySelector('#avatar');
const avatarTarget = avatarField.closest('fieldset').querySelector('.ad-form-header__preview');
const addressField = form.querySelector('#address');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const imagesField = form.querySelector('#images');
const imagesTarget = imagesField.closest('fieldset').querySelector('.ad-form__photo');
const sliderElement = form.querySelector('#price-slider');
const submitButton = form.querySelector('[type="submit"]');
const resetButton = form.querySelector('[type="reset"]');
const priceFieldOptions = {
  range: {
    min: Number(priceField.min),
    max: Number(priceField.max),
  },
  start: getStartPriceValue(),
  connect: 'lower',
};
const successMessageTemplate = document.querySelector('#success');
const successMessageElement = successMessageTemplate.content.querySelector('.success').cloneNode(true);
const errorMessageTemplate = document.querySelector('#error');
const errorMessageElement = errorMessageTemplate.content.querySelector('.error').cloneNode(true);
const errorMessageTarget = errorMessageElement.querySelector('.error__message');
const fieldsToValidate = [
  {
    element: capacityField,
    cb: validateCapacity,
    message: 'The value is not corresponding rooms number'
  },
  {
    element: priceField,
    cb: validatePrice,
    message: 'The value and selected type are not corresponding',
  },
];

const initMainForm = ()=>{
  noUiSlider.create(sliderElement, priceFieldOptions);
  initPristine(form, fieldsToValidate);
  setPriceMin();
  resetButton.addEventListener('click', ()=>{
    onResetButtonClick();
  });
  form.addEventListener('submit', onFormSubmit);
  sliderElement.noUiSlider.on('update', () => {
    priceField.value = sliderElement.noUiSlider.get();
  });
  avatarField.addEventListener('change', (evt)=>{
    addImagePreview(evt.target, avatarTarget);
  });
  roomsField.addEventListener('change', ()=>{
    validateField(capacityField);
  });
  priceField.addEventListener('change', (evt)=>{
    sliderElement.noUiSlider.set(evt.target.value);
  });
  typeField.addEventListener('change', setPriceMin);
  timeInField.addEventListener('change', ()=> {
    changeDependentField(timeOutField, timeInField.value);
  });
  timeOutField.addEventListener('change', ()=> {
    changeDependentField(timeInField, timeOutField.value);
  });
  imagesField.addEventListener('change', (evt)=>{
    addImagePreview(evt.target, imagesTarget);
  });
};
const setAddressValue = (coordinates = INITIAL_COORDINATES)=>{
  addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};
const getMainForm = ()=>({
  element: form,
  selector: '.ad-form'
});

function setPriceMin(){
  const minPrice = getStartPriceValue();
  priceField.min = minPrice;
  priceField.placeholder = minPrice;
  priceField.value = minPrice;
  sliderElement.noUiSlider.set(minPrice);
}
function getStartPriceValue(){
  return MIN_TYPE_PRICE_AMOUNT[typeField.value];
}
function onFormSubmit(evt){
  evt.preventDefault();
  const formIsValid = validateForm();
  if(formIsValid){
    disableElements([submitButton, resetButton]);
    sendData(
      FORM_ACTION,
      () => onSendingDataSuccess(),
      () => onSendingDataError(),
      new FormData(evt.target)
    );
  }
}
function onResetButtonClick(evt){
  if(evt) {
    evt.preventDefault();
  }
  clearFilters();
  form.reset();
  removePreviews(avatarField, avatarTarget);
  removePreviews(imagesField, imagesTarget);
  sliderElement.noUiSlider.updateOptions(priceFieldOptions);
  resetMap();
}
function onSendingDataSuccess(){
  enableElements([submitButton, resetButton]);
  resetButton.click();
  setPriceMin();
  setAddressValue();
  showMessage('success');
}
function onSendingDataError(){
  enableElements([submitButton, resetButton]);
  showMessage('error', ERROR_MESSAGE);
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
    field.value = value;
  }
}
function showMessage(type, message){
  if(type === 'success') {
    document.body.addEventListener('keydown', onBodyKeydownSuccess);
    document.body.addEventListener('click', onBodyClickSuccess);
    document.body.insertAdjacentElement('beforeend', successMessageElement);
  } else {
    document.body.addEventListener('keydown', onBodyKeydownError);
    document.body.addEventListener('click', onBodyClickError);
    errorMessageTarget.innerText = message;
    document.body.insertAdjacentElement('beforeend', errorMessageElement);
  }
}
function closeSuccessMessage() {
  successMessageElement.remove();
  document.body.removeEventListener('keydown', closeSuccessMessage);
  document.body.removeEventListener('click', closeSuccessMessage);
}
function closeErrorMessage() {
  errorMessageElement.remove();
  document.body.removeEventListener('keydown', closeErrorMessage);
  document.body.removeEventListener('click', closeErrorMessage);
}
function onBodyKeydownSuccess(evt){
  if(evt.key === 'Escape') {
    closeSuccessMessage();
  }
}
function onBodyClickSuccess(){
  closeSuccessMessage();
}
function onBodyKeydownError(evt){
  if(evt.key === 'Escape') {
    closeErrorMessage();
  }
}
function onBodyClickError(){
  closeErrorMessage();
}

export {initMainForm, setAddressValue, getMainForm};
