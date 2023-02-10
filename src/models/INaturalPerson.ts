export interface INaturalPersonRequest {
    email: string
    createModel: INaturalPerson
}

export interface INaturalPerson extends Record<string, string> {
    surname: string              //Фамилия
    firstName: string                 //Имя
    middleName: string           //Отчество
    passportSeries: string       //Серия паспорта
    passportNumber: string       //Номер паспорта
    snilsNumber: string          //Номер СНИЛС
    innNumber: string            //Номер ИНН
    registrationAddress: string  //Адрес регистрации
    citizenship: string          //Гражданство
    realAddress: string          //Адрес фактического проживания
    phoneNumber: string          //Номер мобильного телефона
    email: string
}

export const initNaturalPerson: INaturalPerson =  {
    surname: "",
    firstName: "",
    middleName: "",
    passportSeries: "",
    passportNumber: "",
    snilsNumber: "",
    innNumber: "",
    citizenship: "",
    registrationAddress: "",
    realAddress: "",
    phoneNumber: "",
    email: ""
}

export const naturalPersonPlaceholder: INaturalPerson = {
    surname: "Фамилия",
    firstName: "Имя",
    middleName: "Отчество",
    passportSeries: "Серия паспорта",
    passportNumber: "Номер паспорта",
    snilsNumber: "Номер СНИЛС",
    innNumber: "Номер ИНН",
    citizenship: "Гражданство",
    registrationAddress: "Адрес регистрации",
    realAddress: "Адрес фактического проживания",
    phoneNumber: "Номер телефона",
    email: "Электронная почта"
}


// surname = "Фамилия",
// firstName = "Имя",
// middleName = "Отчество",
// passportSeries = "Серия паспорта",
// passportNumber = "Номер паспорта",
// snilsNumber = "Номер СНИЛС",
// innNumber = "Номер ИНН",
// registrationAddress = "Адрес регистрации",
// citizenship = "Гражданство",
// realAddress = "Адрес фактического проживания",
// phoneNumber = "Номер телефона",


