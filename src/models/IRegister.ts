export interface IRegister {
    guid: string,
    email: string,
    password: string,
    //confirmPassword: string,
}

export interface IRegisterConfirm {
    email: string,
    password: string,
    confirmPassword: string
}

export const initRegisterConfirm: IRegisterConfirm = {
    email: "",
    password: "",
    confirmPassword: "",
}