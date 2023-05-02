import React from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { api } from '../../service/api';
import PersonForm from './PersonForm';
import FileInput from './FileInput';
import { RegistrationAddress, registrationAddressProps } from '../../models';

const RegistrationAddressForm = () => {
    const methods = useForm<RegistrationAddress>();
    const [postRegistrationAddress] = api.usePostRegistrationAddressMutation();
    const formLabel = "Адрес регистрации";
    const submitHandler = (data: FieldValues) => {
        postRegistrationAddress(data as RegistrationAddress);
    };    


    return (
        <FormProvider {...methods}>
            <Stack>
                <h2 className='row justify-content-center'>{formLabel}</h2>
                <PersonForm id={`RegistrationAddressForm`} naturalPersonProps={registrationAddressProps} submitHandler={submitHandler} />
                <FileInput name={formLabel}/>    
            </Stack>
        </FormProvider>
    )
}

export default RegistrationAddressForm