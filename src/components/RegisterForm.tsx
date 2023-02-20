import React, {FC} from "react";
import {authApi} from "../service/authApi";
import {initRegisterConfirm, IRegister, IRegisterConfirm} from "../models";
import {Alert, Button, Form} from "react-bootstrap";
import {Navigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";


export const RegisterForm: FC = () => {
    const [onRegister, result] = authApi.useRegisterMutation();

    const {guid} = useParams();

    const {register, handleSubmit, watch, formState: {errors}} = useForm<IRegisterConfirm>({
        defaultValues: initRegisterConfirm
    })


    const submit = async (creds: IRegisterConfirm) => {
        const args = {
            guid: guid,
            email: creds.email,
            password: creds.password,
        } as IRegister;
        await onRegister(args)
    }

    return (
        <div>
            <Form className="col-md-6 offset-md-3 mt-5 " onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control type="email"
                                  placeholder="Электронная почта" {...register("email", {required: true})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" {...register("password", {required: true})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control type="password" placeholder="Повторите пароль"
                                  {...register("confirmPassword", {
                                      required: true,
                                      validate: (val: string) => watch("password") === val || "Пароли не совпадают"
                                  })}/>
                </Form.Group>
                {errors.confirmPassword && errors.confirmPassword.message !== "" ?
                    <Alert variant="danger">{errors.confirmPassword.message}</Alert> : <div/>}

                {result.isSuccess ? <Navigate to="/"/> : (result.error ?
                    <Alert variant="danger">Данные пользователя введены некорректно</Alert> : <div/>)}
                <Button type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    )
}