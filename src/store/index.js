import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import middleware from "./middleware";
import reducer from "./reducer";

const store = createStore(reducer, composeWithDevTools(middleware));

export default store;
export * from "./actions";
export { default as constants } from "./constants";
