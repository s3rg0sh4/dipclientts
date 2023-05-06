import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store";
import {authApi} from "./authApi";
import { INaturalPerson } from "../models";

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({
            baseUrl: "https://localhost:4000/api",
            prepareHeaders: (headers, api) => {
                const token = (api.getState() as RootState).auth.token;
                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
                return headers;
            },
        })

        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            api.dispatch(authApi.endpoints.updateToken.initiate()).then(async () =>
                result = await baseQuery(args, api, extraOptions)
            )
        }
        return result;
    }

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        createNaturalPerson: builder.mutation<void, void>({
            query: (data) => ({
                url: '/createNaturalPerson',
                method: 'POST',
                body: data,
            }),
        }), 

        putNaturalPerson: builder.mutation<void, any>({
            query: (data) => ({
                url: '/putNaturalPerson',
                method: 'PUT',
                body: data,
            })
        }),


        postPersonFiles: builder.mutation<void, FormData>({
            query: (data) => ({
                url: '/postPersonFiles',
                method: 'POST',
                body: data,
            })
        }),

        getNaturalPerson: builder.query<INaturalPerson, void>({
            query: (data) => ({
                url: '/getNaturalPerson',
                method: 'GET',
                body: data,
            })
        }),

        getPersonFiles: builder.query<void, void>({
            query: (data) => ({
                url: '/getFiles',
                method: 'GET',
                body: data,
            })
        }),

        
    })
})