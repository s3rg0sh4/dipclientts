import React, {FC} from "react";
import {ILoginRequest, initLoginRequest} from "../models";
import {authApi} from "../service/authApi";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Alert, Button, Input, FormGroup, InputLabel, Container, FormControl, Stack, FormHelperText} from "@mui/material";


export const LoginForm: FC = () => {

    const [login, result] = authApi.useLoginMutation();

    const {register, handleSubmit, formState: {errors}} = useForm<ILoginRequest>({
        defaultValues: initLoginRequest
    })

    const onSubmit = async (data: ILoginRequest) => await login(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
                <FormControl variant='standard'>
                    <InputLabel>Электронная почта</InputLabel>
                    <Input
                        type="email"
                        required
                        {...register("email")}
                    />
                </FormControl>
                
                <FormControl variant='standard'>
                    <InputLabel>Пароль</InputLabel>
                    <Input 
                        type="password" 
                        required
                        {...register("password")}
                    />
                </FormControl>
                
                
                {result.isSuccess ? <Navigate to="/create"/> : (result.error ?
                    <Alert color="error">Данные пользователя введены некорректно</Alert> : <div/>)}
                
                <Button type="submit">
                    Войти
                </Button>
            </Stack>
        </form>
    )
}