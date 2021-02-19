import { productsReducer } from "./productReducer";
import { cartStateReducer } from "./cartStateReducer";
import { combineReducers } from "redux";

export const Reducers = combineReducers({
  productsState: productsReducer,
  cartState: cartStateReducer
});
