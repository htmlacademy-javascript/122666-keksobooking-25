

const shuffleArray = (array)=> {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getNumberFromRange = (min, max)=>{
  // https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/7
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const randomizeArr = (arr)=>{
  const newArr = arr.slice(0);
  shuffleArray(newArr);
  const sliceRandomIndex = getNumberFromRange(1, newArr.length-1);
  return newArr.slice(0, sliceRandomIndex);
};

const getFloatingPointNumber = (min, max, numberOfDigits)=>{
  // https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/7
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(numberOfDigits);
};

const hideElement = (elm)=>{
  elm.classList.add('hidden');
};

const enableElement =(elm) => {
  if(elm){
    elm.removeAttribute('disabled');
  }
};

const disableElement=(elm)=>{
  if(elm){
    elm.setAttribute('disabled', '');
  }
};

const enableElements=(elms)=> {
  if(elms.length){
    elms.forEach((elm)=>{
      enableElement(elm);
    });
  }
};
const disableElements=(elms)=>{
  if(elms.length){
    elms.forEach((elm) => {
      disableElement(elm);
    });
  }
};

const isInRange=(val, min, max)=> val >= min && val <=max;

export {
  getFloatingPointNumber,
  getNumberFromRange,
  randomizeArr,
  hideElement,
  disableElements,
  enableElements,
  isInRange
};
