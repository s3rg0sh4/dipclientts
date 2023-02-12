export interface IUpdateRequest {
    email: string
    refreshToken: string
}

export interface IUpdateResponse {
    token: string
    refreshToken: string
}