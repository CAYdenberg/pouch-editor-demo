import qs from "query-string";

export const getCredentials = () => {
  const username = localStorage.getItem("koala|username");
  const dbName = localStorage.getItem("koala|dbName");
  const token = localStorage.getItem("koala|token");

  return {
    username: username || "",
    token: token || "",
    dbName: dbName || "",
    isFirstLoad: username === null
  };
};

export const setCredentials = ({ username, token, dbName }) => {
  localStorage.setItem("koala|username", username);
  localStorage.setItem("koala|token", token);
  localStorage.setItem("koala|dbName", dbName);
  return { username, token, dbName };
};

export const parseUrlHash = () => {
  return qs.parse(window.location.hash);
};

export const clearUrlHash = () => {
  window.location.hash = "";
};
