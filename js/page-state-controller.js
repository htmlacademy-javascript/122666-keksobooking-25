import {disableElements, enableElements} from './utils.js';
import {getFiltersForm} from './filters.js';
import {getMainForm} from './mainForm.js';

const mainForm = getMainForm();
const filterForm = getFiltersForm();

const deactivatePage = function(){
  disableForm(mainForm);
  disableForm(filterForm);
};
const enableForm = function(form){
  const disabledElements = form.element.querySelectorAll('[disabled]');
  enableElements(disabledElements);
  form.element.classList.forEach((classString)=>{
    if(classString.includes('--disabled')){
      form.element.classList.remove(classString);
    }
  });
};

function disableForm(form){
  const selectElements = form.element.querySelectorAll('select:not(fieldset select)');
  const fieldsetElements = form.element.querySelectorAll('fieldset:not(.ad-form__element--submit');
  const submitButton = form.element.querySelector('[type="submit"]');
  const resetButton = form.element.querySelector('[type="reset"]');

  form.element.classList.add(`${form.selector.slice(1, form.selector.length)}--disabled`);
  disableElements([...selectElements, ...fieldsetElements, submitButton, resetButton]);
}

export {deactivatePage, enableForm};
