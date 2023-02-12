import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {INaturalPerson, INaturalPersonRequest} from "../models";
import {RootState} from "../store/store";
import {IStatus} from "../models/IStatus";
import {authApi} from "./authApi";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
    prepareHeaders: (headers, api) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (api.getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`); //+10 тысяч проверок возврата и обновление токена по рефреш токену
        }
        return headers;
    },
    //credentials: "include"
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // try to get a new token
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
        postPerson: builder.mutation<void, INaturalPerson>({
            query: (person) => ({
                url: '/create',
                method: 'POST',
                body: {
                    email: localStorage.getItem("email"),
                    createModel: person,
                } as INaturalPersonRequest,
            }),

            // async onQueryStarted(arg, api) {
            //     // await api.queryFulfilled
            //     //     .then(()=>{api.dispatch(hiringStatusActions.changeHiringState(hiringStatus.hiringApplication))})
            // }
        }),
        getStatus: builder.query<IStatus, void>({
            query: () => ({
                url: '/status',
                method: 'GET',
                params: {email: localStorage.getItem("email")},
            }),
        })
    })
})