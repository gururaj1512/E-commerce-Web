import { thunk } from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'  // For Redux Devtools

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';  // redux-persist for storing data in state

import { productDetailReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const persistConfig = {
    key: 'root',
    storage,
}

const persistCombineReducer = combineReducers({
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
}); // To combine multiple reducers in one

const persistedReducer = persistReducer(persistConfig, persistCombineReducer)

let initialState = {
    cart : {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
};
const middleware = [thunk];

export const persistReduxStore = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
// export const persistor = persistStore(persistReduxStore);