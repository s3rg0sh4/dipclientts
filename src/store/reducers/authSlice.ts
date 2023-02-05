import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
    token: string | null
}

const initAuthState: AuthState = {
    token: null
}

const slice = createSlice({
    name: 'auth',
    initialState: initAuthState,
    reducers: {
        setCredentials: (
            state,
            { payload: { token } }: PayloadAction<{ token: string }>
        ) => {
            state.token = token
        },
    },
})

export const { setCredentials } = slice.actions

export default slice.reducer
