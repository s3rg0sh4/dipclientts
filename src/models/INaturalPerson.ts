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
}

export const initNaturalPerson: INaturalPerson =  {
    surname: "",
    firstName: "",
    middleName: "",
    passportSeries: "",
    passportNumber: "",
    snilsNumber: "",
    innNumber: "",
    registrationAddress: "",
    citizenship: "",
    realAddress: "",
    phoneNumber: "",
}

export const naturalPersonPlaceholder: INaturalPerson = {
    surname: "Фамилия",
    firstName: "Имя",
    middleName: "Отчество",
    passportSeries: "Серия паспорта",
    passportNumber: "Номер паспорта",
    snilsNumber: "Номер СНИЛС",
    innNumber: "Номер ИНН",
    registrationAddress: "Адрес регистрации",
    citizenship: "Гражданство",
    realAddress: "Адрес фактического проживания",
    phoneNumber: "Номер телефона"
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


