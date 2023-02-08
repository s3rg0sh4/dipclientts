import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum hiringStatus {
    notHiring,
    hiringApplication,
    hiringOrder
}

const slice = createSlice({
    name: "hiringStatus",
    initialState: hiringStatus.notHiring,
    reducers: {
        changeHiringState(state, action: PayloadAction<hiringStatus>) {
            state = action.payload;
        }
    }
})

export const hiringStatusActions = slice.actions;

export default slice.reducer