import { Address, ContactInfo, PassportData, PersonalInfo, initAddress } from "./NaturalPerson";

export interface INaturalPerson extends PersonalInfo, PassportData, ContactInfo {
    registrationAddress: Address
    realAddress: Address
}

export const initNaturalPerson: INaturalPerson = {
    surname: "",
    firstName: "",
    middleName: "",
    sex: "Мужской",
    birthday: new Date(),
    birthplace: "",

    passportSeries: "",
    passportNumber: "",
    passportGiven: new Date(),
    passportCode: "",
    passportWhen: "",
    snilsNumber: "",
    innNumber: "",
    citizenship: "",

    registrationAddress: initAddress,
    realAddress: initAddress,

    phone: "",
    servicePhone: "",
    homePhone: "",
    email: "",
}

// export const naturalPersonPlaceholder: Record<keyof INaturalPerson, string> = {
//     surname: "Фамилия",
//     firstName: "Имя",
//     middleName: "Отчество",
//     sex: "Пол",
//     birthday: "Дата рождения",
//     birthplace: "Место рождения",

//     passportNumber: "Серия и номер",
//     passportBy: "Выдан",
//     passportCode: "Код подразделения",
//     passportWhen: "Дата выдачи",
//     snilsNumber: "Номер СНИЛС",
//     innNumber: "Номер ИНН",
//     citizenship: "Гражданство",

//     registrationAddress: "Адрес регистрации",
//     realAddress: "Адрес проживания",

//     phone: "Контактный телефон",
//     servicePhone: "Служебный телефон",
//     homePhone: "Домашний телефон",
//     email: "Электронная почта"
// }