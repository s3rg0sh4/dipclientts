import React, { useEffect } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import { useAppDispatch } from '../hooks/redux';
import { hiringStatusActions } from '../store/reducers/hiringStatusSlice';
import { HiringStage } from '../enums';
import NaturalPersonData from './NaturalPersonData';
import { NaturalPersonProps, PersonalInfo, addressProps, contactInfoProps, initNaturalPerson, passportDataProps, personalInfoProps } from '../models';

const ConfirmationPage = () => {
    const navigate = useNavigate();
    let person = initNaturalPerson;
    const personQuery = api.useGetNaturalPersonQuery();
    const [post, result] = api.useCreateNaturalPersonMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (personQuery && personQuery.data) {
            person = personQuery.data
        }
    }, [personQuery])

    const pages = [
        { props: personalInfoProps, label: 'Личная информация' },
        { props: passportDataProps, label: 'Паспортные данные' },
        { props: addressProps, label: 'Адрес регистрации' },
        { props: addressProps, label: 'Адрес проживания' },
        { props: contactInfoProps, label: 'Контактная информация' }
    ]

    return (
        <Stack gap={3} className='p-sm-3 ' style={{ height: "100vh" }}>
            {
                pages.map((page) => <NaturalPersonData key={page.label} naturalPersonProps={page.props as Record<string, NaturalPersonProps>} label={page.label} values={person} />)
            }
            <ButtonGroup className='d-flex mt-auto'>
                <Button
                    variant='outline-secondary'
                    onClick={() => navigate("/")}>Назад</Button>
                <Button
                    variant='success'
                    onClick={() => post()
                        .then(() => dispatch(hiringStatusActions.setHiringState(HiringStage.CreatingNaturalPerson)))
                        .then(() => navigate("/"))
                    }>Отправить на согласование</Button>
            </ButtonGroup>
        </Stack>
    )
}

export default ConfirmationPage