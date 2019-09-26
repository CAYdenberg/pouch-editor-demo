import {
  getCredentials,
  setCredentials,
  parseUrlHash,
  clearUrlHash
} from "./utils";

export const update = (oldCredentials, urlParams) => {
  switch (urlParams.action) {
    case "signup":
    case "login": {
      return {
        username: urlParams.username,
        token: urlParams.token,
        dbName: urlParams.dbName
      };
    }

    case "fail":
    case "logout": {
      return { username: "", token: "", dbName: "" };
    }

    default: {
      return oldCredentials;
    }
  }
};

// the userid is stored in localStorage

// user changes are handled as *redirects* from koala

// if we are redirected it will come through as a fragment identifier
// - userid=(String|undefined)
// - action=("login"|"signup"|"logout"|"fail")
//

export default () => {
  const existingCredentials = getCredentials();
  const { action, username, token, dbName } = parseUrlHash();

  const newCredentials = update(existingCredentials, {
    action,
    username,
    dbName,
    token
  });

  setCredentials(newCredentials);
  clearUrlHash();

  return {
    username: newCredentials.username,
    token: newCredentials.token,
    dbName: newCredentials.dbName,
    isFirstLoad: existingCredentials.isFirstLoad,
    action
  };
};
