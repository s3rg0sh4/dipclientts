import { Stack } from 'react-bootstrap';
import { NaturalPersonProps } from '../models/NaturalPersonProps';
import PersonFormGroup from './PersonFormGroup';
import FileInput from './FileInput';

interface PersonFormStackProps<T,> {
    naturalPersonProps?: T;
    label: string;
    disabled?: boolean;
}

const PersonForm = <T extends Record<string, NaturalPersonProps>,>({ naturalPersonProps, disabled, label }: PersonFormStackProps<T>) => {

    return (
        // <Form id={id} onSubmit={handleSubmit(submitHandler)}>
        <Stack>
            <h2 className='row justify-content-center'>{label}</h2>
            {
                naturalPersonProps
                    ? Object.keys(naturalPersonProps).map((key) => (
                        <PersonFormGroup
                            key={key}
                            id={key}
                            name={key}
                            props={naturalPersonProps[key]}
                            disabled={disabled}
                        />
                    ))
                    : <div />
            }
            <FileInput />
        </Stack>
        // </Form>
    )
}

export default PersonForm