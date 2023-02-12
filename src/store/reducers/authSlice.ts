import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUpdateResponse} from "../../models";

interface IInitAuthState {
    token: string | null,
    isAuth: boolean
}

const initAuthState: IInitAuthState = {
    token: null,
    isAuth: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initAuthState,
    reducers: {
        login(state, action: PayloadAction<IUpdateResponse>) {
            const token = action.payload.token;
            state.isAuth = true;
            if (token) {
                state.token = token;
            }
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        logout(state) {
            state.token = null;
            state.isAuth = false;
            localStorage.clear();
        },
    },
})

export const authActions = slice.actions;

export default slice.reducer