export interface ILoginRequest {
    email: string
    password: string
}

export const initLoginRequest: ILoginRequest = {
    email: "",
    password: ""
}

export interface ILoginResponse {
    email: string
    token: string
    refreshToken: string
    stage: number
}