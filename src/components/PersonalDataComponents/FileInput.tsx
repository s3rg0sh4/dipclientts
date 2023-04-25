import React, { useRef, useState } from 'react'
import { Button, Form, InputGroup, Stack } from 'react-bootstrap'

const FileInput = () => {
    const ref = useRef<HTMLInputElement>(null)
    const files = new FormData();
    const [fileCount, setFileCount] = useState(0);

    const clickHandler = () => {
        if (ref.current && ref.current.files && ref.current.files.length !== 0) {
            files.append('files', ref.current.files.item(0)!);

            ref.current.value = '';
            ref.current.files = null;
            setFileCount(cur => cur + 1);
        }
    }

    return (
        <div>
            <Stack gap={3}>
                <InputGroup>
                    <Form.Control ref={ref} name='file' type='file' />
                    <InputGroup.Text>Файлов добавлено: {fileCount}</InputGroup.Text>
                </InputGroup>
                <Button onClick={clickHandler} variant='outline-secondary'>Загрузить</Button>
            </Stack>
        </div>
    )
}

export default FileInput