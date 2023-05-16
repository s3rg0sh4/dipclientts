// export interface INaturalPerson {
//     surname: string              //Фамилия
//     firstName: string            //Имя
//     middleName: string           //Отчествоs 
//     sex: string
//     birthday: string
//     birthplace: string

import { Address, ContactInfo, PassportData, PersonalInfo, initAddress } from "./NaturalPerson";

//     passportNumber: string       //Серия и номер паспорта
//     passportBy: string           //выдан
//     passportCode: string         //код
//     passportWhen: string         //дата
//     snilsNumber: string          //Номер СНИЛС
//     innNumber: string            //Номер ИНН

//     registrationAddress: string  //Адрес регистрации
//     realAddress: string          //Адрес фактического проживания

//     citizenship: string          //Гражданство
//     phone: string          //Номер мобильного телефона
//     servicePhone: string
//     homePhone: string
//     email: string
// }

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