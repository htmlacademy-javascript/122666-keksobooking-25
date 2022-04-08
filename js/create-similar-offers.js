
import {hideElement} from './utils.js';

const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const createOfferElement = function({author, offer}){
  const offerElement = offerTemplate.cloneNode(true);
  const offerTitleElement = offerElement.querySelector('.popup__title');
  const offerAddressElement = offerElement.querySelector('.popup__text--address');
  const offerPriceElement = offerElement.querySelector('.popup__text--price');
  const offerTypeElement = offerElement.querySelector('.popup__type');
  const offerCapacityElement = offerElement.querySelector('.popup__text--capacity');
  const offerChecktimeElement = offerElement.querySelector('.popup__text--time');
  const offerFeaturesListElement = offerElement.querySelector('.popup__features');
  const offerFeaturesItems = offerFeaturesListElement.querySelectorAll('.popup__feature');
  const offerDescriptionElement = offerElement.querySelector('.popup__description');
  const offerPhotosElement = offerElement.querySelector('.popup__photos');
  const offerPhotoTemplate = offerPhotosElement.querySelector('.popup__photo');
  const offerAvatarElement = offerElement.querySelector('.popup__avatar');
  const canShowAvatar = author && author.avatar;
  const canShowTitle = offer && offer.title;
  const canShowAddress = offer && offer.address;
  const canShowPrice = offer && offer.price;
  const canShowType = offer && offer.type;
  const canShowCapacity = offer && offer.rooms && offer.guests;
  const canShowChecktime = offer && offer.checkin && offer.checkout;
  const canShowFeatures = offer && offer.features && offer.features.length;
  const canShowDescription = offer && offer.description;
  const canShowPhotos = offer && offer.photos && offer.photos.length;

  if(canShowAvatar){
    offerAvatarElement.setAttribute('src',author.avatar);
  } else {
    hideElement(offerAvatarElement);
  }

  if(canShowTitle){
    offerTitleElement.textContent = offer.title;
  } else {
    hideElement(offerTitleElement);
  }
  if(canShowAddress){
    offerAddressElement.textContent = offer.address;
  } else {
    hideElement(offerAddressElement);
  }
  if(canShowPrice){
    offerPriceElement.textContent = `${offer.price} ₽/ночь`;
  } else {
    hideElement(offerPriceElement);
  }
  if(canShowType){
    offerTypeElement.textContent = OFFER_TYPES[offer.type];
  } else {
    hideElement(offerTypeElement);
  }
  if(canShowCapacity){
    offerCapacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    hideElement(offerCapacityElement);
  }
  if(canShowChecktime){
    offerChecktimeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    hideElement(offerChecktimeElement);
  }

  if(canShowFeatures){
    offerFeaturesItems.forEach((featureItem) => {
      const isNecessary = offer.features.some(
        (feature) => featureItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featureItem.remove();
      }
    });
    offerFeaturesListElement.innerHtml = offerFeaturesItems;
  } else {
    hideElement(offerFeaturesListElement);
  }

  if(canShowDescription){
    offerDescriptionElement.textContent = offer.description;
  } else {
    hideElement(offerDescriptionElement);
  }
  if(canShowPhotos){
    offerPhotosElement.innerHTML = '';
    offer.photos.forEach((src)=> {
      const image = offerPhotoTemplate.cloneNode();
      image.setAttribute('src', src);
      offerPhotosElement.appendChild(image);
    });
  } else {
    hideElement(offerPhotosElement);
  }
  return offerElement;
};


export {createOfferElement};
