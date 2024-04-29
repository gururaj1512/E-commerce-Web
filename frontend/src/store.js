import { thunk } from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailReducer, productReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)


let initialState = {};

const middleware = [thunk];

export const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store)