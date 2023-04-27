import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store";
import {authApi} from "./authApi";
import { IPersonField } from "../models/IPersonField";
import { IPersonFile } from "../models/IPersonFile";
import { INaturalPerson } from "../models";
import { ContactInfo, PassportData, PersonalInfo, RealAddress, RegistrationAddress } from "../models/NaturalPerson";

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

        postPersonalInfo: builder.mutation<void, PersonalInfo>({
            query: (data) => ({
                url: '/postPersonalInfo',
                method: 'POST',
                body: data,
            })
        }),

        postPassportData: builder.mutation<void, PassportData>({
            query: (data) => ({
                url: '/postPassportData',
                method: 'POST',
                body: data,
            })
        }),

        postRegistrationAddress: builder.mutation<void, RegistrationAddress>({
            query: (data) => ({
                url: '/postRegistrationAddress',
                method: 'POST',
                body: data,
            })
        }),
        
        postRealAddress: builder.mutation<void, RealAddress>({
            query: (data) => ({
                url: '/postRealAddress',
                method: 'POST',
                body: data,
            })
        }),

        postRealAddressEqualsRegistration: builder.mutation<void, void>({
            query: (data) => ({
                url: '/postRealAddressEqualsRegistration',
                method: 'POST',
                body: data,
            })
        }),

        postContactInfo: builder.mutation<void, ContactInfo>({
            query: (data) => ({
                url: '/postContactInfo',
                method: 'POST',
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