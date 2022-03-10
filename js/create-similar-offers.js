import {getOffers} from './get-offers.js';
/**
На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:

Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
*/

const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const offers = getOffers();
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const offersTargetElement = document.querySelector('#map-canvas');
const offerElements = [];

const createSimilarOffers = ()=>{
  offers.forEach(({author, offer}) => {
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
    offerTitleElement.textContent = offer.title;
    offerAddressElement.textContent = offer.address;
    offerPriceElement.textContent = `${offer.price} ₽/ночь`;
    offerTypeElement.textContent = OFFER_TYPES[offer.type];
    offerCapacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    offerChecktimeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    offerFeaturesItems.forEach((featureItem) => {
      const isNecessary = offer.features.some(
        (feature) => featureItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featureItem.remove();
      }
    });
    offerFeaturesListElement.innerHtml = offerFeaturesItems;
    offerDescriptionElement.textContent = offer.description;
    offerPhotosElement.innerHTML = '';
    offer.photos.forEach((src)=> {
      const image = offerPhotoTemplate.cloneNode();
      image.setAttribute('src', src);
      offerPhotosElement.appendChild(image);
    });
    offerAvatarElement.setAttribute('src',author.avatar);
    offerElements.push(offerElement);
  });

  offersTargetElement.appendChild(offerElements[0]);
};


export {createSimilarOffers};
