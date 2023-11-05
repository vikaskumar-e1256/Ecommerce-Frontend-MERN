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
  }
