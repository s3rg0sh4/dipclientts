export interface INaturalPerson extends Record<string, string> {
    surname: string              //Фамилия
    firstName: string            //Имя
    middleName: string           //Отчествоs 
    sex: string
    birthday: string
    birthplace: string
    passportNumber: string       //Серия и номер паспорта
    passportBy: string           //выдан
    passportCode: string         //код
    passportWhen: string         //дата
    snilsNumber: string          //Номер СНИЛС
    innNumber: string            //Номер ИНН
    registrationAddress: string  //Адрес регистрации
    realAddress: string          //Адрес фактического проживания
    citizenship: string          //Гражданство
    phone: string          //Номер мобильного телефона
    servicePhone: string
    homePhone: string
    email: string
}

// export interface INaturalPersonForm extends INaturalPerson {
//     files: File[]
// }

export const initNaturalPerson: INaturalPerson = {
    surname: "",
    firstName: "",
    middleName: "",
    sex: "",
    birthday: "",
    birthplace: "",
    passportNumber: "",
    passportBy: "",
    passportCode: "",
    passportWhen: "",
    snilsNumber: "",
    innNumber: "",
    citizenship: "",
    registrationAddress: "",
    realAddress: "",
    phone: "",
    servicePhone: "",
    homePhone: "",
    email: "",
}

// export const initNaturalPersonForm: INaturalPersonForm = {
//     surname: "",
//     firstName: "",
//     middleName: "",
//     passportSeries: "",
//     passportNumber: "",
//     snilsNumber: "",
//     innNumber: "",
//     citizenship: "",
//     registrationAddress: "",
//     realAddress: "",
//     phoneNumber: "",
//     email: "",
//     files: []
// }

export const naturalPersonPlaceholder: Record<keyof INaturalPerson, string> = {
    surname: "Фамилия",
    firstName: "Имя",
    middleName: "Отчество",
    sex: "Пол",
    birthday: "Дата рождения",
    birthplace: "Место рождения",
    passportNumber: "Серия и номер",
    passportBy: "Выдан",
    passportCode: "Код подразделения",
    passportWhen: "Дата выдачи",
    snilsNumber: "Номер СНИЛС",
    innNumber: "Номер ИНН",
    citizenship: "Гражданство",
    registrationAddress: "Адрес регистрации",
    realAddress: "Адрес проживания",
    phone: "Контактный телефон",
    servicePhone: "Служебный телефон",
    homePhone: "Домашний телефон",
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


