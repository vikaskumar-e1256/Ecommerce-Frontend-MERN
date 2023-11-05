import { API } from "../config";

export const signup = (userObj) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signin = (userObj) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log(error);
  });
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    const str = localStorage.getItem('jwt');
    const token = str.replace(/^"(.*)"$/, '$1');
    localStorage.removeItem('jwt');
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer '+token,
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      // console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
};
