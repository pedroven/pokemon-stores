import { productsReducer } from "./productReducer";
import { searchedNameStateReducer } from "./searchedNameReducer";
import { combineReducers } from "redux";

export const Reducers = combineReducers({
  productsState: productsReducer,
  searchedNameState: searchedNameStateReducer
});
