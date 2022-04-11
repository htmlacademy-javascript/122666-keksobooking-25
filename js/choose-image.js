const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMAGE_PARAMS = {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
};
const AVATAR_IMAGE_PLACEHOLDER = 'img/muffin-grey.svg';
const ADD_PREVIEWS_HANDLERS = {
  avatar: setAvatarPreview,
  images: setImagesPreview
};
const REMOVE_PREVIEWS_HANDLERS = {
  avatar: removeAvatarPreview,
  images: removeImagesPreview
};

const addImagePreview = (field, target)=>{
  const file = field.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    ADD_PREVIEWS_HANDLERS[field.id](file, target);
  }
};

const removePreviews = (field, target)=>{
  REMOVE_PREVIEWS_HANDLERS[field.id](target);
};

function removeAvatarPreview(element){
  const imageElement = element.querySelector('img');
  imageElement.src = AVATAR_IMAGE_PLACEHOLDER;
}
function removeImagesPreview(element){
  element.innerHTML = '';
}
function setAvatarPreview(file, target){
  const imageElement = target.querySelector('img');
  imageElement.src = URL.createObjectURL(file);
}
function setImagesPreview(file, target){
  target.innerHTML = '';
  const imageElement = document.createElement('img');
  imageElement.src = URL.createObjectURL(file);
  Object.assign(imageElement.style, IMAGE_PARAMS);
  target.appendChild(imageElement);
}


export { addImagePreview, removePreviews};
