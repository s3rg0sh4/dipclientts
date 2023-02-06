import {createApi} from "@reduxjs/toolkit/query/react";
import {ILoginRequest, ILoginResponse} from "../models";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000"}),

    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (creds) => ({
                url: '/authentication/login',
                method: 'POST',
                body: creds,
            }),
            transformResponse: (response: ILoginResponse, meta, arg) => {
                localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));
                localStorage.setItem("token", response.token); //jwt хз че делать
                localStorage.setItem("email", response.email);

                return response;
            }
        }),
        logout: builder.mutation<void, void>({
            query: (credentials) => ({
                url: '/authentication/logout',
                method: 'POST',
            }),
            onQueryStarted: () => localStorage.clear(),
        }),
    }),
})



