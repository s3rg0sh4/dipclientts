import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

interface FormGroupProps {
    label?: string,
    className?: string,
    children: React.ReactNode,
}

const FormGroup = ({label, className, children} : FormGroupProps) => {
    return (
        <Form.Group as={Row} className={className}>
            <Form.Label column md="3">{label}:</Form.Label>
            <Col md="9">
                {children}
            </Col>


        </Form.Group>
    )
}

export default FormGroup