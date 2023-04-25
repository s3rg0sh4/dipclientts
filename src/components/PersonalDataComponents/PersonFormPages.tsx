import React from 'react'
import { Form, Stack } from 'react-bootstrap'
import PersonFormPagination from './PersonFormPagination'
import FormInput from './FormInput';
import FormCheck from './FormCheck';
import FileInput from './FileInput';

const PersonFormPages = () => {
    const pages: React.ReactNode[] = [];

    pages.push(
        <Stack gap={3}>
            <FormInput name='surname' />
            <FormInput name='firstName' />
            <FormInput name='middleName' />
        </Stack>
    );

    pages.push(
        <Stack gap={3}>
            <FormCheck name='sex' />
            <FormInput name='birthday' type='date' />
            <FormInput name='citizenship' />
            <FormInput name='birthplace' />
        </Stack>
    );

    pages.push(
        <Stack gap={3}>
            <FormInput name='passportNumber' />
            <FormInput name='passportBy' />
            <FormInput name='passportCode' />
            <FormInput name='passportWhen' type='date' />
        </Stack>
    );

    pages.push(
        <Stack gap={3}>
            <FormInput name='registrationAddress' />
            <FormInput name='realAddress' />
        </Stack>
    );
    pages.push(
        <Stack gap={3}>
            <FormInput name='snilsNumber' />
            <FormInput name='innNumber' />
        </Stack>
    );
    pages.push(
        <Stack gap={3}>
            <FormInput name='email' />
            <FormInput name='phoneNumber' />
        </Stack>
    );

    pages.push(
        <Stack gap={3}>
            <FileInput/>
        </Stack>
    )

    return (
        <PersonFormPagination formPages={pages} />
    );
}

export default PersonFormPages;