const OFFERS_AMOUNT = 10;
const MIN_DESCRIPTION_WORDS_AMOUNT = 4;
const MAX_PRICE = 1000;
const MAX_ROOMS = 5;
const MAX_GUESTS = 5;
const LOCATION_NUMBER_OF_DIGITS = 5;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const HOURS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LAT_RANGE = [35.65000, 35.70000];
const LNG_RANGE = [139.70000, 139.80000];
const DESCRIPTION_BASE_STRING = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam impedit amet assumenda soluta ratione maxime quo obcaecati consequatur minus! Laboriosam, labore quaerat? Sit at porro laboriosam officiis. Provident, corporis adipisci.';
const arrayFromBaseString = DESCRIPTION_BASE_STRING.split(' ');

getOffers();

function getOffers(){
  const offers = [];
  for(let i=1;i<=OFFERS_AMOUNT;i++){
    const imgNum = i<10 ? `0${i}` : i;
    const lat = getFloatingPointNumber(LAT_RANGE[0], LAT_RANGE[1], LOCATION_NUMBER_OF_DIGITS);
    const lng = getFloatingPointNumber(LNG_RANGE[0], LNG_RANGE[1], LOCATION_NUMBER_OF_DIGITS);
    const typeRandomIndex = getNumberFromRange(0, TYPES.length-1);
    const checkinRandomIndex = getNumberFromRange(0, HOURS.length-1);
    const checkoutRandomIndex = getNumberFromRange(0, HOURS.length-1);
    const sliceRandomIndex = getNumberFromRange(MIN_DESCRIPTION_WORDS_AMOUNT, arrayFromBaseString.length-1);

    const obj = {
      author: {
        avatar: `img/avatars/user${imgNum}.png`
      },
      offer: {
        title:`Title ${i}`,
        address:`${lat} ${lng}`,
        price:getNumberFromRange(1, MAX_PRICE),
        type:TYPES[typeRandomIndex],
        rooms:getNumberFromRange(1, MAX_ROOMS),
        guests:getNumberFromRange(1, MAX_GUESTS),
        checkin:HOURS[checkinRandomIndex],
        checkout:HOURS[checkoutRandomIndex],
        features:randomizeArr(FEATURES),
        description:arrayFromBaseString.slice(0, sliceRandomIndex).join(' '),
        photos:randomizeArr(PHOTOS)
      },
      location:{
        lat,
        lng
      }
    };

    offers.push(obj);
  }
  return offers;
}

function randomizeArr(arr){
  const newArr = arr.slice(0);
  shuffleArray(newArr);
  const sliceRandomIndex = getNumberFromRange(1, newArr.length-1);
  return newArr.slice(0, sliceRandomIndex);
}

function shuffleArray(array) {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getNumberFromRange(min, max){
  // https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/7
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getFloatingPointNumber(min, max, numberOfDigits){
  // https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/7
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(numberOfDigits);
}
