const filtersForm = document.querySelector('.map__filters');
const typeField = filtersForm.querySelector('#housing-type');
const priceField = filtersForm.querySelector('#housing-price');
const roomsField = filtersForm.querySelector('#housing-rooms');
const guestsField = filtersForm.querySelector('#housing-guests');
const filtersCheckboxes = filtersForm.querySelectorAll('.map__checkbox');
const filtersFields = [
  {
    elm: typeField,
    initialValue: typeField.value
  },
  {
    elm: priceField,
    initialValue: priceField.value
  },
  {
    elm: roomsField,
    initialValue: roomsField.value
  },
  {
    elm: guestsField,
    initialValue: guestsField.value
  },
];

const clearFilters = ()=>{
  filtersFields.forEach((field)=>{
    field.elm.value = field.initialValue;
  });
  filtersCheckboxes.forEach((checkbox)=>{
    checkbox.checked = false;
  });
};

export {clearFilters};
