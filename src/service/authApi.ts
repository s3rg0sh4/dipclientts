import {createApi} from "@reduxjs/toolkit/query/react";
import {ILoginRequest, ILoginResponse, IRegister} from "../models";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {authActions} from "../store/reducers/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000/auth",
    //credentials: "include"
})

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,

    endpoints: (builder) => ({
        register: builder.mutation<void, IRegister>({
            query: (creds) => ({
                url: '/setPassword',
                method: 'POST',
                body: creds,
            }),
            onQueryStarted(arg) {
                console.log(arg)
            }

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
                        api.dispatch(authActions.login(res.data.token));
                        localStorage.setItem("email", res.data.email);
                        localStorage.setItem("refreshToken", res.data.refreshToken);
                    })
                    .catch(()=>{})
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            onQueryStarted: (arg, api) => {
                localStorage.clear();
                api.dispatch(authActions.logout());
            },
        }),
    }),
})



