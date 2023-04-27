import React from 'react'
import { Form, Stack } from 'react-bootstrap';
import { NaturalPersonProps } from '../../models/NaturalPersonProps';
import PersonFormGroup from './PersonFormGroup';
import { FieldValues, UseFormHandleSubmit, useFormContext } from 'react-hook-form';

interface PersonFormStackProps<T,> {
    naturalPersonProps: T;
    id: string;
    submitHandler: (data: FieldValues) => void;
}

const PersonForm = <T extends Record<string, NaturalPersonProps>,>({ naturalPersonProps, id, submitHandler }: PersonFormStackProps<T>) => {
    const {handleSubmit} = useFormContext();
    
    return (
        <Form id={id} onSubmit={handleSubmit(submitHandler)}>
            <Stack gap={3}>
                {Object.keys(naturalPersonProps).map((key) => (
                    <PersonFormGroup
                        key={key}
                        name={key}
                        label={naturalPersonProps[key].label}
                        type={naturalPersonProps[key].type}
                        variants={naturalPersonProps[key].variants}
                    />
                ))}
            </Stack>
        </Form>
    )
}

export default PersonForm