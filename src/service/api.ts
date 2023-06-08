import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store";
import {authApi} from "./authApi";
import { INaturalPerson } from "../models";

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({
            baseUrl: "https://backendapi.mospolytech.ru/mainplacehiringbackend/candidate",
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
        applicationStatus: builder.query<string, void>({
            query: () => ({
                url: '/applicationStatus',
                method: 'GET',
                responseHandler: (response) => response.text(),
            }),
        }),

        orderStatus: builder.query<string, void>({
            query: () => ({
                url: '/orderStatus',
                method: 'GET',
                responseHandler: (response) => response.text(),
            })
        }),

        revisionCheck: builder.query<string, void>({
            query: () => ({
                url: '/revisionCheck',
                method: 'GET'
            })
        }),

        createNaturalPerson: builder.mutation<void, void>({
            query: (data) => ({
                url: '/confirm',
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