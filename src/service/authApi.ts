import {createApi} from "@reduxjs/toolkit/query/react";
import {ILoginRequest, ILoginResponse, IRegister, IUpdateRequest, IUpdateResponse} from "../models";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {authActions} from "../store/reducers/authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/auth",
        //credentials: "include"
    }),

    endpoints: (builder) => ({
        updateToken: builder.mutation<IUpdateResponse, void>({
            query: () => ({
                url: '/updateToken',
                method: 'POST',
                body: {
                    email: localStorage.getItem("email"),
                    refreshToken: localStorage.getItem('refreshToken')
                } as IUpdateRequest,
            }),
            async onQueryStarted(arg, api) {
                await api.queryFulfilled.then(res => {
                        api.dispatch(authActions.login(res.data as IUpdateResponse));
                    }
                ).catch(() => {
                    api.dispatch(authActions.logout());
                })
            }
        }),
        register: builder.mutation<void, IRegister>({
            query: (creds) => ({
                url: '/setPassword',
                method: 'POST',
                body: creds,
            }),
        }),
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (creds) => ({
                url: '/login',
                method: 'POST',
                body: creds,
            }),
            async onQueryStarted(arg, api) {
                await api.queryFulfilled
                    .then(res => {
                        api.dispatch(authActions.login(res.data));
                        localStorage.setItem("email", res.data.email);
                    })
                    .catch(() => {
                    });
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            onQueryStarted: (arg, api) => {
                api.dispatch(authActions.logout());
            },
        }),
    }),
})



