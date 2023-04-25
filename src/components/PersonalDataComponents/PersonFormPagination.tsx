import { useState } from 'react'
import { Button, ButtonGroup, Container, Stack } from 'react-bootstrap'
import PersonForm from './PersonForm'

interface PersonFormPaginationProps {
    formPages: React.ReactNode[]
}

const PersonFormPagination = ({ formPages }: PersonFormPaginationProps) => {
    const [page, setPage] = useState(0);

    const nextHandler = () => {
        setPage((current) => {
            if (current < formPages.length - 1) {
                return current + 1;
            } else {
                return current;
            }
        })
    }

    const prevHandler = () => {
        setPage((current) => {
            if (current > 0) {
                return current - 1;
            } else {
                return current;
            }
        })
    }

    return (
        <div>
            <PersonForm>
                <Stack gap={3}>
                    <div style={{height: 350}}>
                        {formPages[page]}
                    </div>
                    <ButtonGroup className='d-flex'>
                        <Button
                            type='submit' variant='outline-secondary'
                            onClick={prevHandler}>Назад</Button>
                        <Button
                            type='submit' variant='outline-secondary'
                            onClick={nextHandler}>Далее</Button>
                    </ButtonGroup>
                </Stack>

            </PersonForm>
        </div>
    )
}

export default PersonFormPagination