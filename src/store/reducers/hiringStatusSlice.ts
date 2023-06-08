import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HiringStage } from "../../enums";

const slice = createSlice({
    name: "hiringStatus",
    initialState: HiringStage.Start,
    reducers: {
        setHiringState(state, action: PayloadAction<HiringStage>) {
            return action.payload;
        }
    }
})

export const hiringStatusActions = slice.actions;

export default slice.reducer