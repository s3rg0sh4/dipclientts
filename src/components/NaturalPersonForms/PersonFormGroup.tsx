import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import PersonFormInput from './PersonFormInput'

interface Props {
    name: string,
    label?: string,
    type?: string,
    variants?: string[],
}

const PersonFormGroup = ({ name, label, type, variants }: Props) => {
    if (type === 'file') {
        return (
            <Form.Group>
                <PersonFormInput name={name} type={type} />
            </Form.Group>
        )
    }

    return (
        <Form.Group as={Row}>
            <Form.Label column lg="3">{label}:</Form.Label>
            <Col lg="9" className="d-flex align-items-center">
                <PersonFormInput name={name} type={type} variants={variants} />
            </Col>
        </Form.Group>
    )
}

export default PersonFormGroup