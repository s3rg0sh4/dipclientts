import {BaseQueryApi, createApi} from "@reduxjs/toolkit/query/react";
import {ILoginRequest, ILoginResponse} from "../models";
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import authSlice, {authActions} from "../store/reducers/authSlice";
import {AppDispatch, RootState} from "../store/store";
import {useDispatch} from "react-redux";
import {api} from "./api";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    //credentials: "include"
})

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,

    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (creds) => ({
                url: '/authentication/login',
                method: 'POST',
                body: creds,
            }),
            async onQueryStarted(arg, api) {
                await api.queryFulfilled.then(res => {
                        api.dispatch(authActions.login(res.data.token));
                        localStorage.setItem("email", res.data.email);
                        localStorage.setItem("refreshToken", res.data.refreshToken);
                        console.log((api.getState() as RootState).auth)
                    }).catch(()=>{})
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/authentication/logout',
                method: 'POST',
            }),
            onQueryStarted: (arg, api) => {
                localStorage.clear();
                api.dispatch(authActions.logout());
            },
        }),
    }),
})



