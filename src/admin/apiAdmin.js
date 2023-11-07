import { API } from "../config";

const str = localStorage.getItem('jwt');
const token = str.replace(/^"(.*)"$/, '$1');
const tokenWithBearer = 'Bearer ' + token;

export const createCategory = (body) => {
  return fetch(`${API}/categories`, {
    method: "POST",
    headers: {
      Authorization: tokenWithBearer,
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
