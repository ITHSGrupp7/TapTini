import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = true;

const cartIconSlice = createSlice({
    name: "cartIcon",
    initialState,
    reducers: {
        showCartIcon: (_, action: PayloadAction<boolean>) => {
            return action.payload;
        
        }
    }
});

export const {showCartIcon} = cartIconSlice.actions;
export default cartIconSlice.reducer;