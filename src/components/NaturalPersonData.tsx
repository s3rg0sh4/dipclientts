import moment from 'moment';
import { INaturalPerson, NaturalPersonProps } from '../models';
import { Stack } from 'react-bootstrap';
import { type } from 'os';

interface NaturalPersonDataProps<T,> {
    naturalPersonProps: T;
    label: string;
    values: INaturalPerson;
    disabled?: boolean;
    path?: string;
}

const dateToText = (date: string) => {
    return date.split('T')[0];
}

const log = (s: string) => {
    console.log(typeof(s))
    return s;
}

const NaturalPersonData = <T extends Record<string, NaturalPersonProps>,>({ path, naturalPersonProps, label, values }: NaturalPersonDataProps<T>) => {
    return (
        <div>
            <h3>{label}</h3>
            <Stack gap={1}>
                {
                    Object.keys(naturalPersonProps).map((key) => (
                        <span key={path ? path + "." + key : key}>
                            {naturalPersonProps[key].label}: {" "}
                            {naturalPersonProps[key].type === 'date'
                            ? dateToText(path ? (values[path])[key] : values[key])
                            : path ? (values[path])[key] : values[key]
                            }
                        </span>
                    ))
                }
            </Stack>
        </div>
    )
}

export default NaturalPersonData