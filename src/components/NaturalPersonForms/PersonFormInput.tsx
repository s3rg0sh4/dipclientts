import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Stack } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

interface Props {
    name: string,
    type?: string,
    variants?: string[],
}

const PersonFormInput = ({ name, type, variants }: Props) => {
    const { register, setValue } = useFormContext();

    const [files, setFiles] = useState<File[]>([]);
    register('files')

    useEffect(() => {
        setValue('files', files)
    }, [files])

    if (type === 'file') {

        return (
            <Stack gap={3}>
                <InputGroup>
                    <Form.Control
                        type='file'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files) {
                                setFiles([...files, e.target.files[0]])
                            }
                        }}
                    />
                </InputGroup>
                <Button variant='outline-secondary' type='submit'
                    onClick={() => {

                    }}>Загрузить файл</Button>
            </Stack>

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
            type={type}
        />
    )
}

export default PersonFormInput;