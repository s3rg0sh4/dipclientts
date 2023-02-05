import {Button, Form} from "react-bootstrap";
import React, {FC, useState} from "react";
import {personApi} from "../service/personApi";
import { ILoginRequest, initLoginRequest } from "../models";
import {ILoginResponse} from "../models/ILoginResponse";


const LoginForm: FC = () => {

    const [login, result] = personApi.useLoginMutation();

    const [loginRequest, setLoginRequest] = useState<ILoginRequest>(initLoginRequest);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } : { name: string, value: string } = e.target;
        setLoginRequest({...loginRequest, [name]: value})
    }

    const handleSubmit = async () => {
        //setIsSubmitting(true); //проверочку на авторизацию
        await login(loginRequest);
    }

    return (
        <div>
            <Form className="col-md-6 offset-md-3 mt-5 ">
                <Form.Group className="mb-3">
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Электронная почта" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Пароль" onChange={handleChange}/>
                </Form.Group>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                    Авторизоваться
                </Button>
            </Form>

        </div>
    )
}

export default LoginForm;