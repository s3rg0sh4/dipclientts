import React, {FC, useState} from "react";
import {authApi} from "../service/authApi";
import {initRegisterConfirm, IRegister, IRegisterConfirm} from "../models";
import {Alert, Button, Form} from "react-bootstrap";
import {Navigate, useParams} from "react-router-dom";


export const RegisterForm: FC = () => {
    const [register, result] = authApi.useRegisterMutation();

    const { guid } = useParams();

    const [creds, setCreds] = useState<IRegisterConfirm>(initRegisterConfirm);

    const [isMatched, setIsMatched] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } : { name: string, value: string } = e.target;
        setCreds({...creds, [name]: value});
    }

    const handleSubmit = async () => {
        if (creds.confirmPassword === creds.password) {
            const args = {
                guid: guid,
                email: creds.email,
                password: creds.password,
            } as IRegister;

            await register(args)//.then(setIsSubmitting(true));
        }
    }

    return (
        <div>
            <Form className="col-md-6 offset-md-3 mt-5 ">
                <Form.Group className="mb-3">
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control onChange={handleChange} name="email" type="email" placeholder="Электронная почта"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control onChange={handleChange} name="password" type="password" placeholder="Пароль"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control onChange={handleChange} name="confirmPassword" type="password" placeholder="Повторите пароль"/>
                </Form.Group>
                {result.isSuccess?<Navigate to="/login"/>:(result.error?<Alert variant="danger">Данные пользователя введены некорректно</Alert>:<div/>)}
                <Button onClick={handleSubmit} disabled={isMatched}>
                    Авторизоваться
                </Button>
            </Form>

        </div>
    )
}