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

const sendData = (action, onSuccess, onFail, body) => {
  fetch(
    action,
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((err) => {
      onFail(err);
    });
};

export {getData, sendData};
