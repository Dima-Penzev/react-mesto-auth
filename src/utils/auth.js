const BASE_URL = "https://auth.nomoreparties.co";

function requestData(url, option) {
  return fetch(url, option).then(getResponseData);
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function register(password, email) {
  return requestData(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });

  // return fetch(`${BASE_URL}/signup`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ password, email }),
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => console.log(err));
}

export function login(password, email) {
  return requestData(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });

  // fetch(`${BASE_URL}/signin`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ password, email }),
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => console.log(err));
}

export function getContent(token) {
  return requestData(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // fetch(`${BASE_URL}/users/me`, {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => console.log(err));
}
