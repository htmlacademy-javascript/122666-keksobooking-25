const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMAGE_PARAMS = {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
};
const HANDLERS = {
  avatar: (file, target)=>{
    const imageElement = target.querySelector('img');
    imageElement.src = URL.createObjectURL(file);
  },
  images: (file, target)=>{
    target.innerHTML = '';
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(file);
    Object.assign(imageElement.style, IMAGE_PARAMS);
    target.appendChild(imageElement);
  }
};

const addImagePreview = function(field, target){
  const file = field.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    HANDLERS[field.id](file, target);
  }
};


export { addImagePreview };
