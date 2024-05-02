import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = 'id';

const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        resetId: () => {
            return 'id';
        },
        setId: (state, action : PayloadAction<string>) => {
            return state = action.payload;
        }
    }
});

export const {resetId, setId} = idSlice.actions;
export default idSlice.reducer;