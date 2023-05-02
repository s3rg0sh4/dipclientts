import React from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { api } from '../../service/api';
import PersonForm from './PersonForm';
import { passportDataProps } from '../../models/NaturalPersonProps';
import FileInput from './FileInput';
import { PassportData } from '../../models/NaturalPerson';

const PassportDataForm = () => {
    const [postPassportData] = api.usePostPassportDataMutation();
    const methods = useForm<PassportData>();
    const formLabel = "Паспортные данные";
    const submitHandler = (data: FieldValues) => {
        postPassportData(data as PassportData);
    };

    return (
        <FormProvider {...methods}>
            <Stack>
                <h2 className='row justify-content-center'>{formLabel}</h2>
                <PersonForm id={`PassportDataForm`} naturalPersonProps={passportDataProps} submitHandler={submitHandler} />
                <FileInput name={formLabel}/>
            </Stack>
        </FormProvider>
    )
}

export default PassportDataForm