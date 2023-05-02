import React from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { PersonalInfo } from '../../models/NaturalPerson';
import { api } from '../../service/api';
import PersonForm from './PersonForm';
import { personalInfoProps } from '../../models/NaturalPersonProps';
import FileInput from './FileInput';

const PersonalInfoForm = () => {
    const methods = useForm<PersonalInfo>();
    const [postPersonalInfo] = api.usePostPersonalInfoMutation();
    const formLabel = "Личная информация";
    const submitHandler = (data: FieldValues) => {
        postPersonalInfo(data as PersonalInfo);
    };    
    
    return (
        <FormProvider {...methods}>
            <Stack>
                <h2 className='row justify-content-center'>{formLabel}</h2>
                <PersonForm id={`PersonalInfoForm`} naturalPersonProps={personalInfoProps} submitHandler={submitHandler} />
                <FileInput name={formLabel}/>    
            </Stack>
        </FormProvider>
    )
}

export default PersonalInfoForm