import { productsReducer } from './productReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
	productsState: productsReducer
});
