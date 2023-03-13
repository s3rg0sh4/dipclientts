import React, {FC} from "react";
import {authApi} from "../service/authApi";
import {initRegisterConfirm, IRegister, IRegisterConfirm} from "../models";
import {Navigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Alert, Button, Container, FormControl, FormLabel, Input, Stack, InputLabel} from "@mui/material";
import { ValidationError } from "yup";


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
        <Container maxWidth='md'>
            <form onSubmit={handleSubmit(submit)}>
                <Stack spacing={1}>
                    <FormControl variant='standard'>
                        <InputLabel>Электронная почта</InputLabel>
                        <Input 
                            type="email"
                            required
                            {...register("email")}/>
                    </FormControl>
                    <FormControl variant='standard'>
                        <InputLabel>Пароль</InputLabel>
                        <Input 
                            type="password" 
                            required
                            {...register("password")}
                        />
                    </FormControl>
                    <FormControl variant='standard'>
                        <InputLabel>Повторите пароль</InputLabel>
                        <Input 
                            type="password" 
                            required
                            {...register("confirmPassword", {validate: (val: string) => watch("password") === val || "Пароли не совпадают"})}
                        />
                    </FormControl>
                    {errors.confirmPassword && errors.confirmPassword.message !== "" ?
                        <Alert color="error">{errors.confirmPassword.message}</Alert> : <div/>}

                    {result.isSuccess ? <Navigate to="/"/> : (result.error ?
                        <Alert color="error">Данные пользователя введены некорректно</Alert> : <div/>)}
                    <Button type="submit">
                        Зарегистрироваться
                    </Button>
                </Stack>
                
            </form>
        </Container>
    )
}