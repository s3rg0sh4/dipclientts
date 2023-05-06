import React from 'react'
import { INaturalPerson, NaturalPersonProps } from '../models';
import { Row, Stack } from 'react-bootstrap';

interface NaturalPersonDataProps<T,> {
    naturalPersonProps: T;
    label: string;
    values: INaturalPerson;
    disabled?: boolean;
}

const NaturalPersonData = <T extends Record<string, NaturalPersonProps>,>({ naturalPersonProps, label, values }: NaturalPersonDataProps<T>) => {
    return (
        <div>
            <h3>{label}</h3>
            <Stack gap={1}>
                {
                    Object.keys(naturalPersonProps).map((key) => (
                        <span key={key}>{naturalPersonProps[key].label}: {values[key]}</span>
                    ))
                }
            </Stack>
        </div>
    )
}

export default NaturalPersonData