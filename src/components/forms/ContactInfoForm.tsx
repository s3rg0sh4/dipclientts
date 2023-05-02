import React from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { api } from '../../service/api';
import PersonForm from './PersonForm';
import FileInput from './FileInput';
import { ContactInfo, contactInfoProps } from '../../models';

const ContactInfoForm = () => {
    const methods = useForm<ContactInfo>();
    const [postContactInfo] = api.usePostContactInfoMutation();
    const formLabel = "Контактная информация";
    const submitHandler = (data: FieldValues) => {
        postContactInfo(data as ContactInfo);
    };


    return (
        <FormProvider {...methods}>
            <Stack>
                <h2 className='row justify-content-center'>{formLabel}</h2>
                <PersonForm id={`ContactInfoForm`} naturalPersonProps={contactInfoProps} submitHandler={submitHandler} />
            </Stack>
        </FormProvider>
    )
}

export default ContactInfoForm