import React, { useState } from 'react'
import { FieldValues, FormProvider, UseFormReturn, useForm } from 'react-hook-form';
import { Address, ContactInfo, PassportData, PersonalInfo, RealAddress, RegistrationAddress } from '../models/NaturalPerson';
import { addressProps, contactInfoProps, fileProps, passportDataProps, personalInfoProps, realAddressProps, registrationAddressProps } from '../models/NaturalPersonProps';

import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap';
import { api } from '../service/api';
import PersonalInfoForm from './forms/PersonalInfoForm';
import PassportDataForm from './forms/PassportDataForm';
import RegistrationAddressForm from './forms/RegistrationAddressForm';
import RealAddressForm from './forms/RealAddressForm';
import ContactInfoForm from './forms/ContactInfoForm';
import AdditionalFilesField from './forms/AdditionalFilesField';

const NaturalPersonFormPages = () => {
    const pages = [
        { form: <PersonalInfoForm />, name: "PersonalInfoForm" },
        { form: <PassportDataForm />, name: "PassportDataForm" },
        { form: <RegistrationAddressForm />, name: "RegistrationAddressForm" },
        { form: <RealAddressForm />, name: "RealAddressForm" },
        { form: <ContactInfoForm />, name: "ContactInfoForm" },
        { form: <AdditionalFilesField />, name: "AdditionalFilesField" }
    ];

    const [page, setPage] = useState(0);

    const formSubmit = (page: number) => {
        document.getElementById(pages[page]!.name)?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
    }

    return (
        <Stack className='p-sm-3 col-md-6 offset-md-3' gap={3} style={{ height: "100vh" }}>
            {pages[page]!.form}
            <ButtonGroup className='d-flex mt-auto'>
                {
                    <Button
                        variant='outline-secondary'
                        disabled={page === 0}
                        onClick={() => {
                            formSubmit(page)
                            setPage(cur => cur - 1);
                        }}>Назад</Button>
                }
                {
                    page !== pages.length - 1
                        ? <Button
                            variant='outline-secondary'
                            onClick={() => {
                                formSubmit(page)
                                setPage(cur => cur + 1);
                            }}>Далее</Button>
                        : <Button
                            variant='success'
                            onClick={() => {

                            }}>Отправить</Button>
                }

            </ButtonGroup>
        </Stack>

    )
}

export default NaturalPersonFormPages