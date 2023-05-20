import { INaturalPerson, NaturalPersonProps } from '../models';
import { Stack } from 'react-bootstrap';
import {useEffect} from 'react'

interface NaturalPersonDataProps<T,> {
    naturalPersonProps: T;
    label: string;
    values: INaturalPerson;
    disabled?: boolean;
    path?: string;
}

const NaturalPersonData = <T extends Record<string, NaturalPersonProps>,>({ path, naturalPersonProps, label, values }: NaturalPersonDataProps<T>) => {
    return (
        <div>
            <h3>{label}</h3>
            <Stack gap={1}>
                {
                    Object.keys(naturalPersonProps).map((key) => (
                        <span key={path ? path + "." + key : key}>{naturalPersonProps[key].label}: {JSON.stringify(path ? (values[path])[key] : values[key])}</span>
                    ))
                }
            </Stack>
        </div>
    )
}

export default NaturalPersonData