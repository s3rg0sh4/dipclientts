import React, { useRef, useState, useEffect } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { api } from '../../service/api';
import PersonForm from './PersonForm';
import { RealAddress, realAddressProps } from '../../models';
import FileInput from './FileInput';

const RealAddressForm = () => {
    const methods = useForm<RealAddress>();
    const [postRegistrationAddress] = api.usePostRegistrationAddressMutation();
    const [postRealAddressEqualsRegistration] = api.usePostRealAddressEqualsRegistrationMutation();

    const formLabel = "Адрес проживания";
    const [isChecked, setIsChecked] = useState(false);
    const submitHandler = (data: FieldValues) => {
        if (isChecked) {
            postRealAddressEqualsRegistration();
        } else {
            postRegistrationAddress(data as RealAddress);
        }
    };



    return (
        <FormProvider {...methods}>
            <Stack gap={3} style={{ height: "100vh" }}>
                <h2 className='row justify-content-center'>{formLabel}</h2>
                <PersonForm
                    id={`RealAddressForm`}
                    naturalPersonProps={realAddressProps}
                    submitHandler={submitHandler}
                    disabled={isChecked}
                />
                <FileInput
                    name={formLabel}
                    disabled={isChecked}
                />
                <Form.Check
                    label="Совпадает с адресом регистрации"
                    type='switch'
                    checked={isChecked}
                    onChange={() => setIsChecked(cur => !cur)}
                />
            </Stack>
        </FormProvider>
    )
}

export default RealAddressForm