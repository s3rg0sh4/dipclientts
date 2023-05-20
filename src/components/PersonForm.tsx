import { Stack } from 'react-bootstrap';
import { NaturalPersonProps } from '../models/NaturalPersonProps';
import PersonFormGroup from './PersonFormGroup';
import FileInput from './FileInput';

interface PersonFormStackProps<T,> {
    naturalPersonProps?: T;
    label: string;
    disabled?: boolean;
    name?: string
}

const PersonForm = <T extends Record<string, NaturalPersonProps>,>({ name, naturalPersonProps, disabled, label }: PersonFormStackProps<T>) => {
    return (
        // <Form id={id} onSubmit={handleSubmit(submitHandler)}>
        <Stack>
            <h2 className='row justify-content-center'>{label}</h2>
            {
                naturalPersonProps
                    ? Object.keys(naturalPersonProps).map((key) => (
                        <PersonFormGroup
                            key={name ? name + "." + key : key}
                            name={name ? name + "." + key : key}
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