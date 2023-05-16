import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { FC } from "react";
import { ILoginRequest, initLoginRequest } from "../models";
import { authApi } from "../service/authApi";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";


export const LoginForm: FC = () => {

    const [login, result] = authApi.useLoginMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginRequest>({
        defaultValues: initLoginRequest
    })

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Form className="col-md-4 offset-md-4 align-self-center mb-5"
                onSubmit={handleSubmit(
                    async (data: ILoginRequest) => await login(data)
                )}>
                <Form.Group className="mb-3">
                    <Form.Label>Электронная почта</Form.Label>
                    {errors.email?.type === "required" && <Alert>Это поле обязательно</Alert>}
                    <Form.Control type="email"
                        placeholder="Электронная почта" {...register("email", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    {errors.password?.type === "required" && <Alert>Это поле обязательно</Alert>}
                    <Form.Control type="password" placeholder="Пароль" {...register("password", { required: true })} />
                </Form.Group>
                <div className="d-flex">
                    <Button type="submit" className="mb-3 mx-auto"
                    >Войти
                    </Button>
                </div>
                {result.isSuccess
                    ? <Navigate to="/" />
                    : (result.error
                        ? <Alert variant="danger">Пользователь не найден</Alert>
                        : <div />)}
            </Form>
        </div>
    )
}