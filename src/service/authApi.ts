import {createApi} from "@reduxjs/toolkit/query/react";
import {ILoginRequest, ILoginResponse, IRegister, IUpdateRequest, IUpdateResponse} from "../models";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {authActions} from "../store/reducers/authSlice";
import { hiringStatusActions } from "../store/reducers/hiringStatusSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:4000/auth",
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
        register: builder.mutation<ILoginResponse, IRegister>({
            query: (creds) => ({
                url: '/register',
                method: 'POST',
                body: creds,
            }),
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled
                    .then(res => {
                        api.dispatch(authActions.login(res.data));
                        localStorage.setItem("email", res.data.email);
                        api.dispatch(hiringStatusActions.setHiringState(res.data.stage))
                    })
                    .catch(() => {
                    });
            }
        }),
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (creds) => ({
                url: '/login',
                method: 'POST',
                body: creds,
            }),
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled
                    .then(res => {
                        api.dispatch(authActions.login(res.data));
                        localStorage.setItem("email", res.data.email);
                        api.dispatch(hiringStatusActions.setHiringState(res.data.stage))
                    })
                    .catch(() => {
                    });
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                body: localStorage.getItem("refreshToken"),
            }),
            onQueryStarted: (arg, api) => {
                api.dispatch(authActions.logout());
            },
        }),
    }),
})



