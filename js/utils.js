

const shuffleArray = function(array){
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getNumberFromRange = function(min, max){
  // https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/7
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const randomizeArr = function(arr){
  const newArr = arr.slice(0);
  shuffleArray(newArr);
  const sliceRandomIndex = getNumberFromRange(1, newArr.length-1);
  return newArr.slice(0, sliceRandomIndex);
};

const getFloatingPointNumber = function(min, max, numberOfDigits){
  // https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/7
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(numberOfDigits);
};

const hideElement = function(element){
  element.classList.add('hidden');
};

const enableElement = function(element){
  if(element){
    element.removeAttribute('disabled');
  }
};

const disableElement = function(element){
  if(element){
    element.setAttribute('disabled', '');
  }
};

const enableElements = function(elements){
  if(elements.length){
    elements.forEach((element)=>{
      enableElement(element);
    });
  }
};
const disableElements = function(elements){
  if(elements.length){
    elements.forEach((element) => {
      disableElement(element);
    });
  }
};

const isInRange = function(value, min, max){
  return value >= min && value <=max;
};

const debounce = function(callback, timeoutDelay = 500){
  // Источник - https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/20
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {
  getFloatingPointNumber,
  getNumberFromRange,
  randomizeArr,
  hideElement,
  disableElements,
  enableElements,
  isInRange,
  debounce
};
