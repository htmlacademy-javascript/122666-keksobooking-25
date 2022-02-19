getNumberFromRange(2, 16);
getFloatingPointNumber(1.1, 1.2, 3);

function getNumberFromRange(min, max){
  const rangeIsInvalid = validateRange(min, max);
  if(rangeIsInvalid){
    return rangeIsInvalid;
  }
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

function getFloatingPointNumber(min, max, numberOfDigits){
  const rangeIsInvalid = validateRange(min, max);
  if(rangeIsInvalid){
    return rangeIsInvalid;
  }
  const result = Math.random() * (max - min + 1) + min;
  return Number(result.toFixed(numberOfDigits)); // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
}


// added third function to avoid repeating 'if'-constructions
function validateRange(min, max){
  if(min < 0){
    return 'Min value should not be lower than zero';
  }
  if(min>=max){
    return 'Max value should not be equal or lower then min value';
  }
}
