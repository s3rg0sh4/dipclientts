import {createSlice} from '@reduxjs/toolkit'

const initAuthState = {
    token: "",
    refreshToken: ""
};

const slice = createSlice({
    name: 'auth',
    initialState: initAuthState,
    reducers: {
        login(state) {

            state.token = ""; //localStorage.getItem("token");
        },
        logout(state) {
            state.token = "";
        },
    },
})

//export const authActions = slice.actions;

export default slice.reducer