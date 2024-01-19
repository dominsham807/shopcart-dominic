import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "./api/productAPI.js";
import storage from 'redux-persist/lib/storage'
import { 
    persistReducer, 
    persistStore, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import { userReducer } from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";

const reducers = combineReducers({
    [ProductApi.reducerPath]: ProductApi.reducer ,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat([
            ProductApi.middleware
        ])
})

export const persistor = persistStore(store)