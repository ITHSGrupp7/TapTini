import { combineReducers, configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cart/cartSlice"
import idReducer from "./id/idSlice"
import cartIconReducer from "./cartIcon/cartIconSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    cart: cartReducer,
    id: idReducer,
    cartIcon: cartIconReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer:persistedReducer
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;