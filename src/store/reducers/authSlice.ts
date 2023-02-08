import {createSlice, PayloadAction} from '@reduxjs/toolkit'

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
        login(state, action: PayloadAction<string>) {//
            const token = action.payload;
            state.isAuth = true;
            if (token) {
                state.token = token;
            }
        },
        logout(state) {
            state.token = null;
            state.isAuth = false;
        },
    },
})

export const authActions = slice.actions;

export default slice.reducer