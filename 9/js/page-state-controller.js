import {disableElements, enableElements} from './utils.js';

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
  enableElements(disabledElms);
  form.classList.forEach((classStr)=>{
    if(classStr.includes('--disabled')){
      form.classList.remove(classStr);
    }
  });
}

function disableForm(selector){
  const form = document.querySelector(selector);
  const selectElements = form.querySelectorAll('select:not(fieldset select)');
  const fieldsetElements = form.querySelectorAll('fieldset');
  const submitElm = form.querySelector('[type="submit"]');
  const resetElm = form.querySelector('[type="reset"]');

  form.classList.add(`${selector.slice(1, selector.length)}--disabled`);
  disableElements([...selectElements, ...fieldsetElements, submitElm, resetElm]);
}

export {deactivatePage, activatePage};
