import {Alert, Button, Form} from "react-bootstrap";
import React, {FC, useState} from "react";
import {ILoginRequest, initLoginRequest} from "../models";
import {authApi} from "../service/authApi";
import {Navigate} from "react-router-dom";
import {authActions} from "../store/reducers/authSlice";


export const LoginForm: FC = () => {

    const [login, result] = authApi.useLoginMutation();

    const [loginRequest, setLoginRequest] = useState<ILoginRequest>(initLoginRequest);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } : { name: string, value: string } = e.target;
        setLoginRequest({...loginRequest, [name]: value})
    }

    const handleSubmit = async () => {
        //setIsSubmitting(true); //проверочку на авторизацию
        await login(loginRequest);
        // authActions.login();
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
                {result.isSuccess?<Navigate to="/"/>:(result.error?<Alert variant="danger">Данные пользователя введены некорректно</Alert>:<div/>)}
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                    Авторизоваться
                </Button>
            </Form>

        </div>
    )
}