import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store";
import {authApi} from "./authApi";
import { IPersonField } from "../models/IPersonField";
import { IPersonFile } from "../models/IPersonFile";
import { INaturalPerson } from "../models";

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({
            baseUrl: "http://localhost:4000/api",
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
        postPerson: builder.mutation<void, void>({
            query: (data) => ({
                url: '/create',
                method: 'POST',
                body: data,
            }),
        }),

        postPersonField: builder.mutation<void, IPersonField>({
            query: (data) => ({
                url: '/postField',
                method: 'POST',
                body: data,
            })
        }),

        postPersonFiles: builder.mutation<void, IPersonFile>({
            query: (data) => ({
                url: '/loadDocument',
                method: 'POST',
                body: data,
            })
        }),

        getPersonFields: builder.query<INaturalPerson, void>({
            query: (data) => ({
                url: '/getFields',
                method: 'POST',
                body: data,
            })
        }),

        getPersonFiles: builder.query<void, void>({
            query: (data) => ({
                url: '/getDocuments',
                method: 'POST',
                body: data,
            })
        }),

    })
})