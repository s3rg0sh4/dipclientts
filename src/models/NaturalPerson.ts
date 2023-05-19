export interface PersonalInfo extends Record<string, any> {
    surname: string              //Фамилия
    firstName: string            //Имя
    middleName: string           //Отчество 
    sex: string
    birthday: Date
    birthplace: string
}

export interface PassportData extends Record<string, any> {
    passportSeries: string       //Серия 
    passportNumber: string       //Номер паспорта
    passportGiven: string          //выдан
    passportCode: string         //код
    passportWhen: Date         //дата
    snilsNumber: string          //Номер СНИЛС
    innNumber: string            //ИНН
}

export interface ContactInfo extends Record<string, any> {
    phone: string          //Номер мобильного телефона
    servicePhone: string
    homePhone: string
    email: string
}

export interface Address extends Record<string, any> {
    country: string
    city: string
    street: string
    house: string
    building: string
    flat: string
    index: string
}

export const initAddress: Address = {
    country: '',
    city: '',
    street: '',
    house: '',
    building: '',
    flat: '',
    index: '',
}