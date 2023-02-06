import {IRefreshToken} from "./IRefreshToken";

export interface ILoginResponse {
    email: string,
    token: string,
    refreshToken: IRefreshToken
}