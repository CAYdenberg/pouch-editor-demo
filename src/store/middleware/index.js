import { applyMiddleware } from "redux";
import KoalaMiddleware from "./redux-koala";

const koalaMiddleware = KoalaMiddleware(process.env.KOALA_URI);

export default applyMiddleware(koalaMiddleware);
