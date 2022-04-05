const getData = (address, onSuccess, onError) => {
  fetch(
    address,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (action, onSuccess, onError, body) => {
  fetch(
    action,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        setTimeout(() => {
          onSuccess();
        }, 3000);
      } else {
        onError();
      }
    })
    .catch((err) => {
      onError(err);
    });
};

export {getData, sendData};
