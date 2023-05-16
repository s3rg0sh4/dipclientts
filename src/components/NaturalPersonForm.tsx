import React, { useEffect, useState } from 'react'
import { FieldValues, FormProvider, UseFormReturn, useForm } from 'react-hook-form';

import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap';
import { api } from '../service/api';
import { INaturalPerson, addressProps, contactInfoProps, initNaturalPerson, passportDataProps, personalInfoProps } from '../models';
import PersonForm from './PersonForm';
import { useNavigate } from 'react-router-dom';

const NaturalPersonForm = () => {
    const navigate = useNavigate();


    const methods = useForm({
        defaultValues: initNaturalPerson
    })
    const { handleSubmit, reset } = methods;

    const [put] = api.usePutNaturalPersonMutation();
    const naturalPersonQuery = api.useGetNaturalPersonQuery();

    useEffect(() => {
        if (naturalPersonQuery.data) {
            reset(naturalPersonQuery.data)
        }
    }, [naturalPersonQuery])



    const [page, setPage] = useState(0);
    const [prevDisabled, disablePrev] = React.useState(true);
    const [nextDisabled, disableNext] = React.useState(false);

    const submitHandler = (data: INaturalPerson) => {
        page === 0 ? disablePrev(true) : disablePrev(false);

        put(data);

        if (page === pages.length - 1) {

        }
    }


    const pages = [
        { props: personalInfoProps, label: 'Личная информация' },
        { props: passportDataProps, label: 'Паспортные данные' },
        { props: addressProps, label: 'Адрес регистрации' },
        { props: addressProps, label: 'Адрес проживания' },
        { props: contactInfoProps, label: 'Контактная информация' },
        { label: 'Дополнительные файлы' }
    ]

    return (
        <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Stack gap={3} className='p-sm-3 ' style={{ height: "100vh" }}>
                    <PersonForm naturalPersonProps={pages[page].props} label={pages[page].label} />

                    <ButtonGroup className='d-flex mt-auto'>
                        {
                            <Button
                                type='submit'
                                variant='outline-secondary'
                                disabled={prevDisabled}
                                onClick={() => {

                                    setPage(cur => cur - 1);
                                }}>Назад</Button>
                        }
                        {
                            page !== pages.length - 1
                                ? <Button
                                    type='submit'
                                    variant='outline-secondary'
                                    onClick={() => {
                                        setPage(cur => cur + 1);
                                    }}>Далее</Button>
                                : <Button
                                    variant='success'
                                    onClick={() => navigate("/confirm")
                                    }>Готово</Button>
                        }
                    </ButtonGroup>
                </Stack>
            </Form>
        </FormProvider >
    )
}

export default NaturalPersonForm