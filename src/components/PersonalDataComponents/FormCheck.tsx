import React, { useState } from 'react'
import { ButtonGroup, Col, Form, Row, Stack, ToggleButton } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form';
import { naturalPersonPlaceholder } from '../../models';
import FormGroup from './FormGroup';

interface FormCheckProps {
    name: string,
    className?: string
}

const FormCheck = ({ name, className }: FormCheckProps) => {
    const { register } = useFormContext();

    return (
        <FormGroup label={naturalPersonPlaceholder[name]}>
            <Stack direction='horizontal' gap={3}>
                <Form.Check
                    label="Мужской"
                    type='radio'
                    value={"true"}
                    {...register(name)}
                />
                <Form.Check
                    label="Женский"
                    type='radio'
                    value={"false"}
                    {...register(name)}
                />
            </Stack>
        </FormGroup>
    )
}

export default FormCheck