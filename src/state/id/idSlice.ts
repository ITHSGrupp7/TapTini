import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = 'id';

const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        resetId: () => {
            return 'id';
        },
        setId: (_, action : PayloadAction<string>) => {
            return action.payload;
        }
    }
});

export const {resetId, setId} = idSlice.actions;
export default idSlice.reducer;