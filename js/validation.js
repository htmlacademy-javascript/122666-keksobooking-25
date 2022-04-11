let pristine;

const initPristine = (form, fieldsToValidate)=>{
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
const validateField = (field)=>{
  pristine.validate(field);
};
const validateForm = ()=>{
  const isValid = pristine.validate();
  return isValid;
};

export { initPristine, validateField, validateForm };
