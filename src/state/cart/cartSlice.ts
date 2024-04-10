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

    },
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;