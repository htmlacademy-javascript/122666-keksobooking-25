const deactivatePage = ()=>{
  disableForm('.ad-form');
  disableForm('.map__filters');
};

const activatePage = ()=> {
  const forms = document.querySelectorAll('form');
  forms.forEach((form)=>{
    enableForm(form);
  });
};

function enableForm(form){
  const disabledElms = form.querySelectorAll('[disabled]');
  disabledElms.forEach((elm)=>{
    elm.removeAttribute('disabled');
  });
  form.classList.forEach((classStr)=>{
    if(classStr.includes('--disabled')){
      form.classList.remove(classStr);
    }
  });
}

function disableForm(selector){
  const form = document.querySelector(selector);
  form.classList.add(`${selector.slice(1, selector.length - 1)}--disabled`);
  const selectElements = form.querySelectorAll('select:not(fieldset select)');
  const fieldsetElements = form.querySelectorAll('fieldset');
  const submitElm = form.querySelector('[type="submit"]');
  const resetElm = form.querySelector('[type="submit"]');
  disableElement(submitElm);
  disableElement(resetElm);
  disableElements(selectElements);
  disableElements(fieldsetElements);
}

function disableElements(elmsArr){
  if(elmsArr.length){
    elmsArr.forEach((elm) => {
      elm.setAttribute('disabled', '');
    });
  }
}
function disableElement(elm){
  if(elm){
    elm.setAttribute('disabled', '');
  }
}

export {deactivatePage, activatePage};
