import { configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cart/cartSlice"
import idReducer from "./id/idSlice"
import cartIconReducer from "./cartIcon/cartIconSlice"

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        id: idReducer,
        cartIcon: cartIconReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;