import React, {FC, useState} from "react";
import {api} from "../service/api";
import {Button, Form} from "react-bootstrap";
import {INaturalPerson, initNaturalPerson, naturalPersonPlaceholder} from "../models";
import {authApi} from "../service/authApi";
import { useNavigate} from "react-router-dom";


export const NaturalPerson: FC = () => {

    const [postPerson, result] = api.usePostPersonMutation();

    const [person, setPerson] = useState<INaturalPerson>(initNaturalPerson);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } : { name: string, value: string } = e.target;
        setPerson({...person, [name]: value})
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleCreate = async () => {
        //setIsSubmitting(true);//если ошибка, кнопку разбанить, мб спиннер докинуть
        await postPerson(person);
    }

    return(
        <div>
            <Form className="col-md-6 offset-md-3 my-3">
                {Object.keys(person).map((key) => (
                    <Form.Control className="mb-3" type="text" onChange={handleChange}
                                  key={key} name={key} placeholder={naturalPersonPlaceholder[key]}/>)
                )}

                <Button onClick={handleCreate} disabled={isSubmitting}>
                    Сохранить
                </Button>
            </Form>
        </div>
    );
};
