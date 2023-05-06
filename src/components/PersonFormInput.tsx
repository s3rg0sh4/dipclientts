import React, { useEffect, useState } from 'react'
import { Button, Form, FormControlProps, InputGroup, Stack } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'
import FileInput from './FileInput';

interface Props extends FormControlProps {
    name: string,
    variants?: string[],
    initial?: string
}

const PersonFormInput = ({ name, type, variants, disabled }: Props) => {
    const { register } = useFormContext();

    if (type === 'switch') {
        return (
            <Form.Check
                key={`switch`}
                type='switch'
                {...register(name)} />
        )
    }

    if (type === 'file') {
        register(name)
        return (
            <FileInput/>
        )
    }

    if (type === 'radio') {
        return (
            <Stack direction='horizontal' gap={3}>
                {
                    variants?.map((variant, id) => (
                        <Form.Check
                            key={`radio${id}`}
                            label={variant}
                            type={type}
                            value={variant}
                            {...register(name)}
                        />
                    ))
                }
            </Stack>
        )
    }


    return (
        <Form.Control
            {...register(name)}
            disabled={disabled}
            type={type}
        />
    )
}

export default PersonFormInput;