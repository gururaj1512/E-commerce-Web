import { thunk } from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailReducer, productReducer } from './reducers/productReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;