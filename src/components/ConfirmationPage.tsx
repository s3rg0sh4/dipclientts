import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import { useAppDispatch } from '../hooks/redux';
import { hiringStatusActions } from '../store/reducers/hiringStatusSlice';
import { HiringStage } from '../enums';
import NaturalPersonData from './NaturalPersonData';
import { NaturalPersonProps, contactInfoProps, initNaturalPerson, passportDataProps, personalInfoProps, realAddressProps, registrationAddressProps } from '../models';

const ConfirmationPage = () => {
    const navigate = useNavigate();
    const [person, setPerson] = useState(initNaturalPerson);
    const personQuery = api.useGetNaturalPersonQuery();
    const [post, result] = api.useCreateNaturalPersonMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (personQuery && personQuery.data) {
            setPerson(personQuery.data)
        }
    }, [personQuery])

    const pages = [
        { props: personalInfoProps, label: 'Личная информация' },
        { props: passportDataProps, label: 'Паспортные данные' },
        { props: registrationAddressProps, label: 'Адрес регистрации', path: 'registrationAddress' },
        { props: realAddressProps, label: 'Адрес проживания', path: 'realAddress' },
        { props: contactInfoProps, label: 'Контактная информация' }
    ]

    return (
        <Stack gap={3} className='p-sm-3 ' style={{ height: "100vh" }}>
            {
                pages.map((page) => <NaturalPersonData
                    key={page.label}
                    naturalPersonProps={page.props as Record<string, NaturalPersonProps>}
                    label={page.label}
                    path={page.path}
                    values={person} />)
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