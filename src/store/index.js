import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import middleware from "./middleware";

const reducer = (initialState = false, action) => {
  return false;
};

const store = createStore(reducer, composeWithDevTools(middleware));

export default store;
