import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    // id: number;
    name: string;
    price: number;
};

type CartState = {
   items: CartItem[];
};

const initialState: CartState = {
    items:[],
} 

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            state.items = state.items.filter(item => item.name != action.payload.name)
        }
    },
})

export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;