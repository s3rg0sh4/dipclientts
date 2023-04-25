import React, { useState, useEffect } from 'react'
import { api } from '../../service/api';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Container, Form, Stack } from 'react-bootstrap';
import { INaturalPerson, initNaturalPerson } from '../../models';
import { IPersonField } from '../../models/IPersonField';

interface PersonFormProps {
    children: React.ReactNode,
}

const PersonForm = ({ children }: PersonFormProps) => {
    //const get = api.useGetPersonFieldsQuery();
    const [personData, setPersonData] = useState<INaturalPerson>(initNaturalPerson)

    const [post] = api.usePostPersonFieldMutation();

    const methods = useForm<INaturalPerson>();

    const { handleSubmit } = methods;

    const submitHandler = (data: INaturalPerson) => {
        //десять тыщ классов в физлице пофиксить
        let isNew = false;
        Object.keys(personData).map((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                isNew = true;
                setPersonData(cur => {
                    cur[key] = data[key];
                    return cur;
                })
            }
        })

        if (isNew) {
            //post
        }

        //console.log(personData)

    }

    return (
        <div className='py-3 col-md-6 offset-md-3'>
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    {children}
                </Form>
            </FormProvider>
        </div>
    )
}

export default PersonForm