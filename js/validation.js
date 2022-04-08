let pristine;

const initPristine = function(form, fieldsToValidate){
  pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent:'ad-form__element',
  });

  fieldsToValidate.forEach((field) => {
    pristine.addValidator(
      field.element,
      field.cb,
      field.message
    );
  });
};
const validateField = function(field){
  pristine.validate(field);
};
const validateForm = function(){
  return pristine.validate();
};

export { initPristine, validateField, validateForm };
