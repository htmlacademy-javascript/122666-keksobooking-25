const getNumberFromRange = (min, max)=>{
  // https://up.htmlacademy.ru/profession/react/9/javascript/25/tasks/7
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const hideElement = (element)=>{
  element.classList.add('hidden');
};

const enableElement = (element)=>{
  if(element){
    element.disabled = false;
  }
};

const disableElement = (element)=>{
  if(element){
    element.disabled = true;
  }
};

const enableElements = (elements)=>{
  if(elements.length){
    elements.forEach((element)=>{
      enableElement(element);
    });
  }
};

const disableElements = (elements)=>{
  if(elements.length){
    elements.forEach((element) => {
      disableElement(element);
    });
  }
};

const isInRange = (value, min, max)=>value >= min && value <=max;

const debounce = (callback, timeoutDelay = 500)=>{
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
  getNumberFromRange,
  hideElement,
  disableElements,
  enableElements,
  isInRange,
  debounce
};
