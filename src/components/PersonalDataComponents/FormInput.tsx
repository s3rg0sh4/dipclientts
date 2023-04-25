import React from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { naturalPersonPlaceholder } from '../../models'
import FormGroup from './FormGroup'

interface FormInputProps {
    name: string,
    className?: string,
    type?: string,
}

const FormInput = ({ name, className, type }: FormInputProps) => {
    const { register } = useFormContext();

    return (
        <FormGroup label={naturalPersonPlaceholder[name]}>
            <Form.Control
                type={type}
                key={name}
                {...register(name)}
            />
        </FormGroup>
    )
}

export default FormInput;