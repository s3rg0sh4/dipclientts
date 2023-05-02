import React from 'react'
import { Form, Stack } from 'react-bootstrap';
import { NaturalPersonProps } from '../../models/NaturalPersonProps';
import PersonFormGroup from './PersonFormGroup';
import { FieldValues, useFormContext } from 'react-hook-form';

interface PersonFormStackProps<T,> {
    naturalPersonProps: T;
    id: string;
    submitHandler: (data: FieldValues) => void;
    disabled?: boolean;
}

const PersonForm = <T extends Record<string, NaturalPersonProps>,>({ naturalPersonProps, id, submitHandler, disabled }: PersonFormStackProps<T>) => {
    const {handleSubmit} = useFormContext();
    
    return (
        <Form id={id} onSubmit={handleSubmit(submitHandler)}>
            <Stack>
                {Object.keys(naturalPersonProps).map((key) => (
                    <PersonFormGroup
                        key={key}
                        name={key}
                        label={naturalPersonProps[key].label}
                        type={naturalPersonProps[key].type}
                        variants={naturalPersonProps[key].variants}
                        disabled={disabled}
                    />
                ))}
            </Stack>
        </Form>
    )
}

export default PersonForm