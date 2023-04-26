import React, { useState } from 'react'
import { FieldValues, FormProvider, UseFormReturn, useForm } from 'react-hook-form';
import { Address, ContactInfo, PassportData, PersonalInfo, RealAddress, RegistrationAddress } from '../../models/NaturalPerson';
import { addressProps, contactInfoProps, fileProps, passportDataProps, personalInfoProps } from '../../models/NaturalPersonProps';
import PersonForm from './PersonForm';
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap';
import { api } from '../../service/api';
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../hooks/redux';

const PersonFormPages = () => {
    const [postPersonalInfo] = api.usePostPersonalInfoMutation();
    const [postPassportData] = api.usePostPassportDataMutation();
    const [postRegistrationAddress] = api.usePostRegistrationAddressMutation();
    const [postRealAddress] = api.usePostRealAddressMutation();
    const [postContactInfo] = api.usePostContactInfoMutation();
    const [postFiles] = api.usePostPersonFilesMutation();

    const pages = [{
        methods: useForm<PersonalInfo>(),
        props: personalInfoProps,
        label: "Личная информация",
        submitHandler: (data: FieldValues) => {
            postPersonalInfo(data as PersonalInfo);
        },
    }, {
        methods: useForm<PassportData>(),
        props: passportDataProps,
        label: "Паспортные данные",
        submitHandler: (data: FieldValues) => {
            postPassportData(data as PassportData);
        },
    }, {
        methods: useForm<RegistrationAddress>(),
        props: addressProps,
        label: "Адрес регистрации",
        submitHandler: (data: FieldValues) => {
            postRegistrationAddress(data as RegistrationAddress);
        },
    }, {
        methods: useForm<RealAddress>(),
        props: addressProps,
        label: "Адрес проживания",
        submitHandler: (data: FieldValues) => {
            postRealAddress(data as RealAddress);
        },
    }, {
        methods: useForm<ContactInfo>(),
        props: contactInfoProps,
        label: "Контактная информация",
        submitHandler: (data: FieldValues) => {
            postContactInfo(data as ContactInfo);
        },
    }, {
        methods: useForm<File[]>(),
        props: fileProps,
        label: "Загрузка документов",
        submitHandler: (data: FieldValues) => {
            let formData = new FormData();
            

            for (let file of (data.files as File[])) {
                formData.append('file', file);
            }

            postFiles(formData);
        },
    }];

    const [page, setPage] = useState(0);

    return (
        <FormProvider {...(pages[page].methods as UseFormReturn<any, any>)}>
            <div>
                <Stack className='p-3 col-md-6 offset-md-3' gap={3} style={{ height: "100vh" }}>
                    <h2 className='row justify-content-center'>{pages[page].label}</h2>
                    <PersonForm id={`form${page}`} naturalPersonProps={pages[page].props} submitHandler={pages[page].submitHandler} />
                    <ButtonGroup className='d-flex mt-auto'>
                        <Button
                            type='submit'
                            form={`${page}`}
                            variant='outline-secondary'
                            disabled={page === 0}
                            onClick={() => {
                                document.getElementById(`form${page}`)?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
                                setPage(cur => cur - 1);
                            }}>Назад</Button>
                        <Button
                            type='submit'
                            form={`${page}`}
                            variant='outline-secondary'
                            disabled={page === pages.length - 1}
                            onClick={() => {
                                document.getElementById(`form${page}`)?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
                                setPage(cur => cur + 1);
                            }}>Далее</Button>
                    </ButtonGroup>
                </Stack>
            </div>
        </FormProvider>

    )
}

export default PersonFormPages