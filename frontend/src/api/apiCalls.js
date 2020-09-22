import axios from "axios";

// Başında adresi vermediğimiz için kendi portu olan 3000'e istek atar.
//Backendin olduğu port olan 4000'e istek atmak için package.json'da proxy değerini 4000 yaptık.
export const signup = (body) => {
  return axios.post("/api/1.0/users", body);
};

export const login = (creds) => {
  return axios.post("/api/1.0/auth", {}, { auth: creds });
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};

export const getUsers = () => {
  return axios.get("/api/1.0/users");
};
