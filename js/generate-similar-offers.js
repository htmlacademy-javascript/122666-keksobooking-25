import {getOffers} from './get-offers.js';
/**
На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:




В список .popup__features выведите все доступные удобства в объявлении.



В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.

Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.

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

const generateOffers = ()=>{
  offers.forEach(({author, location, offer}) => {
    console.log(offer);
    const offerElement = offerTemplate.cloneNode(true);
    const offerTitleElement = offerElement.querySelector('.popup__title');
    const offerAddressElement = offerElement.querySelector('.popup__text--address');
    const offerPriceElement = offerElement.querySelector('.popup__text--price');
    const offerTypeElement = offerElement.querySelector('.popup__type');
    const offerCapacityElement = offerElement.querySelector('.popup__text--capacity');
    const offerChecktimeElement = offerElement.querySelector('.popup__text--time');
    const offerFeaturesElement = offerElement.querySelector('.popup__features');
    const offerDescriptionElement = offerElement.querySelector('.popup__description');
    const offerPhotosElement = offerElement.querySelector('.popup__photos');
    const offerAvatarElement = offerElement.querySelector('.popup__avatar');
    offerTitleElement.textContent = offer.title;
    offerAddressElement.textContent = offer.address;
    offerPriceElement.textContent = `${offer.price} ₽/ночь`;
    offerTypeElement.textContent = OFFER_TYPES[offer.type];
    offerCapacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    offerChecktimeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    offerDescriptionElement.textContent = offer.description;
    offerAvatarElement.setAttribute('src',author.avatar);
    offersTargetElement.appendChild(offerElement);
  });

};


export {generateOffers};
