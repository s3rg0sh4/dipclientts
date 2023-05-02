import React, { useState, useEffect } from 'react'
import { Form, FormControlProps, InputGroup } from 'react-bootstrap'
import { api } from '../../service/api';

interface FileInputProps extends FormControlProps {
    name?: string,
}

const FileInput = ({name, disabled}: FileInputProps) => {
    const [post, result] = api.usePostPersonFilesMutation();
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (files.length > 0 && files[files.length - 1]) {
            const formData = new FormData();
            formData.append('file', files[files.length - 1], name);
            post(formData);
        }
    }, [files])

    return (
        <InputGroup className='mt-sm-3'>
            <Form.Control
                disabled={disabled}
                type='file'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                        setFiles([...files, e.target.files[0]])
                    }
                }}
            />
            <InputGroup.Text>{files ? files.length : 0}</InputGroup.Text>
        </InputGroup>
    )
}

export default FileInput