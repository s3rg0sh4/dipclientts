import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ILoginRequest, INaturalPerson} from "../models";
import {RootState} from "../store/store";
import {ILoginResponse} from "../models/ILoginResponse";

export const personApi = createApi({
    reducerPath: "personApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
        prepareHeaders: (headers, {getState}) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
        //credentials: "include"
    }),
    endpoints: (builder) => ({
        postPerson: builder.mutation<void, INaturalPerson>({
            query: (person) => ({
                url: '/api/create',
                method: 'POST',
                body: person,
            }),
        }),
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: '/authentication/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    })
})

