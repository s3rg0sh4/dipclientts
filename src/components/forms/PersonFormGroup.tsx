import React from 'react'
import { Button, Col, Form, FormControlProps, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import PersonFormInput from './PersonFormInput'
import FileInput from './FileInput'

interface Props extends FormControlProps {
    name: string,
    label?: string,
    variants?: string[]
}

const PersonFormGroup = ({ name, label, type, variants, disabled }: Props) => {
    if (type === 'file') {
        return (
            <Form.Group className='mt-sm-3'>
                <FileInput />
            </Form.Group>
        )
    }

    return (
        <Form.Group as={Row} className='mt-sm-3'>
            <Form.Label column lg="3">{label}:</Form.Label>
            <Col lg="9" className="d-flex align-items-center">
                <PersonFormInput name={name} type={type} variants={variants} disabled={disabled} />
            </Col>
        </Form.Group>
    )
}

export default PersonFormGroup