import { Address, ContactInfo, PassportData, PersonalInfo, RealAddress, RegistrationAddress } from "./NaturalPerson"

export interface NaturalPersonProps {
    label?: string
    type?: "text" | "date" | "radio" | "file" | "switch"
    variants?: string[]
}

export const personalInfoProps: Record<keyof PersonalInfo, NaturalPersonProps> = {
    surname: { label: "Фамилия" },
    firstName: { label: "Имя" },
    middleName: { label: "Отчество" },
    sex: { label: "Пол", type: "radio", variants: ["Мужской", "Женский"] },
    birthday: { label: "Дата рождения", type: "date" },
    birthplace: { label: "Место рождения" },
}

export const passportDataProps: Record<keyof PassportData, NaturalPersonProps> = {
    passportNumber: { label: "Серия и номер" },
    passportBy: { label: "Выдан" },
    passportCode: { label: "Код подразделения" },
    passportWhen: { label: "Дата выдачи", type: "date" },
    snilsNumber: { label: "СНИЛС" },
    innNumber: { label: "ИНН" },
}

export const contactInfoProps: Record<keyof ContactInfo, NaturalPersonProps> = {
    phone: { label: "Мобильный телефон" },
    servicePhone: { label: "Служебный телефон" },
    homePhone: { label: "Домашний телефон" },
    email: { label: "Электронная почта" },
}

export const addressProps: Record<keyof Address, NaturalPersonProps> = {
    // country: {label: "Страна"}, 
    city: { label: "Город" },
    street: { label: "Улица" },
    house: { label: "Дом" },
    building: { label: "Корпус" },
    flat: { label: "Квартира" }
}

export const registrationAddressProps: Record<keyof RegistrationAddress, NaturalPersonProps> = {...addressProps}

export const realAddressProps: Record<keyof RealAddress, NaturalPersonProps> = {
    ...addressProps, 
    // sameAsRegistration: { label: "Совпадает с адресом регистрации", type: 'switch' }
}

export const fileProps: Record<string, NaturalPersonProps> = {
    files: { type: 'file' }
}