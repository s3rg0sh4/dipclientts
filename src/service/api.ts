import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {ILoginResponse, INaturalPerson} from "../models";
import authSlice, {authActions} from "../store/reducers/authSlice";
import {RootState, store} from "../store/store";
import {IStatus} from "../models/IStatus";
import {authApi} from "./authApi";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
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
        const refreshResult = await baseQuery({
            url: '/authentication/updateToken',
            method: 'POST',
            body: {
                email: localStorage.getItem("email"),
                token: (api.getState() as RootState).auth.token,
                // token: localStorage.getItem("token"),
                refreshToken: localStorage.getItem('refreshToken')
            } as ILoginResponse
        }, api, extraOptions);


        if (refreshResult.data) {
            const response = refreshResult.data as ILoginResponse;
            localStorage.setItem("refreshToken", response.refreshToken);
            api.dispatch(authActions.login(response.token));

            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.clear();
            api.dispatch(authActions.logout());
        }
    }
    return result;
}

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        postPerson: builder.mutation<void, INaturalPerson>({
            query: (person) => ({
                url: '/api/create',
                method: 'POST',
                body: person,
            }),
        }),
        getStatus: builder.query<IStatus, string>({
            query: () => ({
                url: '/api/status',
                method: 'GET',
                params: {email: localStorage.getItem("email")},
            }),
        })
    })
})