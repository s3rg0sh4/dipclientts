export interface ILoginRequest {
    email: string
    password: string
}

export const initLoginRequest: ILoginRequest = {
    email: "",
    password: ""
}