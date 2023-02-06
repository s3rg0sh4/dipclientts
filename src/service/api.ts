import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {ILoginResponse, INaturalPerson, IRefreshToken} from "../models";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers, {getState}) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        // const token = (getState() as RootState).auth.token;
        const token = localStorage.getItem("token");
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
        const refreshTokenJson = localStorage.getItem('refreshToken');
        let refreshToken = {};
        if (refreshTokenJson){
            refreshToken = JSON.parse(refreshTokenJson);
        }

        // try to get a new token
        const refreshResult = await baseQuery({
            url: '/authentication/updateToken',
            method: 'POST',
            body: {
                email: localStorage.getItem("email"),
                token: localStorage.getItem("token"),
                refreshToken: refreshToken as IRefreshToken
            } as ILoginResponse
        }, api, extraOptions);



        if (refreshResult.data) {
            // store the new token            редюсер
            //api.dispatch(login(refreshResult.data))
            // retry the initial query
            const response = refreshResult.data as ILoginResponse;
            localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));
            localStorage.setItem("token", response.token); //jwt хз че дыелать

            result = await baseQuery(args, api, extraOptions)


        } else {
            // api.dispatch(logout())
            localStorage.clear()
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
    })
})