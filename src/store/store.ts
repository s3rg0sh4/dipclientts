import {configureStore} from "@reduxjs/toolkit";
import {api} from "../service/api";
import authReducer from "./reducers/authSlice";
import hiringStatusReducer from "./reducers/hiringStatusSlice";
import {authApi} from "../service/authApi";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        hiringStatus: hiringStatusReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch