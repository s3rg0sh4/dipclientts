import { useRef, useState } from 'react'
import { Button, ButtonGroup, Container, Stack } from 'react-bootstrap'
import PersonForm from './PersonForm'

interface PersonFormPaginationProps {
    formPages: React.ReactNode[]
}

const PersonFormPagination = ({ formPages }: PersonFormPaginationProps) => {
    const [page, setPage] = useState(0);

    const ref = useRef<HTMLFormElement>(null);

    const nextHandler = () => {
        setPage((current) => {
            ref.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            return current + 1;
        })
    }

    const prevHandler = () => {
        setPage((current) => {
            ref.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            return current - 1;
        })

    }

    return (
        <div>
            <PersonForm ref={ref}>
                <Stack gap={3}>
                    <div style={{ height: 350 }}>
                        {formPages[page]}
                    </div>
                    <ButtonGroup className='d-flex'>
                        <Button
                            variant='outline-secondary'
                            disabled={page === 0}
                            onClick={prevHandler}>Назад</Button>
                        <Button
                            variant='outline-secondary'
                            disabled={page === formPages.length - 1}
                            onClick={nextHandler}>Далее</Button>
                    </ButtonGroup>
                </Stack>

            </PersonForm>
        </div>
    )
}

export default PersonFormPagination