import {getOffers} from './get-offers.js';
/**
На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:

Выведите заголовок объявления offer.title в заголовок .popup__title.

Выведите адрес offer.address в блок .popup__text--address.

Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».

В блок .popup__type выведите тип жилья offer.type

Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».

Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».

В список .popup__features выведите все доступные удобства в объявлении.

В блок .popup__description выведите описание объекта недвижимости offer.description.

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
  offers.forEach(offer => {
    const offerElement = offerTemplate.cloneNode(true);
    const offerTitleElement = offerElement.querySelector('.popup__title');
    const offerAdressElement = offerElement.querySelector('.popup__text--address');
    const offerPriceElement = offerElement.querySelector('.popup__text--price');
    const offerTypeElement = offerElement.querySelector('.popup__type');
    const offerCapacityElement = offerElement.querySelector('.popup__text--capacity');
    const offerChecktimeElement = offerElement.querySelector('.popup__text--time');
    const offerFeaturesElement = offerElement.querySelector('.popup__features');
    const offerDescriptionElement = offerElement.querySelector('.popup__description');
    const offerPhotosElement = offerElement.querySelector('.popup__photos');
    const offerAvatarElement = offerElement.querySelector('.popup__avatar');
    offersTargetElement.appendChild(offerElement);
  });

};


export {generateOffers};
