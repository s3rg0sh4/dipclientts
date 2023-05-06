import React, {useEffect} from 'react'
import { Button, Col, Form, FormControlProps, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import PersonFormInput from './PersonFormInput';
import FileInput from './FileInput';
import { NaturalPersonProps } from '../models'

interface Props extends FormControlProps {
    name: string,
    props?: NaturalPersonProps
}

const PersonFormGroup = ({ name, type, disabled, props}: Props) => {
    if (type === 'file') {
        return (
            <Form.Group className='mt-sm-3'>
                <FileInput />
            </Form.Group>
        )
    }

    return (
        <Form.Group as={Row} className='mt-sm-3'>
            <Form.Label column lg="3">{props?.label}:</Form.Label>
            <Col lg="9" className="d-flex align-items-center">
                <PersonFormInput name={name} type={props?.type} variants={props?.variants} disabled={disabled}/>
            </Col>
        </Form.Group>
    )
}

export default PersonFormGroup