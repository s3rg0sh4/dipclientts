export interface PersonalInfo extends Record<string, any> {
    surname: string              //Фамилия
    firstName: string            //Имя
    middleName: string           //Отчество 
    sex: string
    birthday: string
    birthplace: string
}

export interface PassportData extends Record<string, any> {
    passportNumber: string       //Серия и номер паспорта
    passportBy: string           //выдан
    passportCode: string         //код
    passportWhen: string         //дата
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

export interface RealAddress extends Address {
    sameAsRegistration?: boolean
}

export interface RegistrationAddress extends Address {
    
}