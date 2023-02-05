import React, {FC, useState} from "react";
import {personApi} from "../service/personApi";
import {Button, Form} from "react-bootstrap";
import {INaturalPerson, initNaturalPerson, naturalPersonPlaceholder} from "../models";


const NaturalPerson: FC = () => {

    const [postPerson, result] = personApi.usePostPersonMutation();

    const [person, setPerson] = useState<INaturalPerson>(initNaturalPerson);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } : { name: string, value: string } = e.target;
        setPerson({...person, [name]: value})
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleCreate = async () => {
        //setIsSubmitting(true);//если ошибка, кнопку разбанить, мб спиннер докинуть
        await postPerson(person);
        console.log(result);
    }

    return(
        <div>
            <Form className="col-md-6 offset-md-3 mt-5">
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

export default NaturalPerson;
