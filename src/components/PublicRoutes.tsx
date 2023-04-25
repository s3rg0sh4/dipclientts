import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import {LoginForm} from "./LoginForm";
import {RegisterForm} from "./RegisterForm";

export const PublicRoutes = () => {
    return (//проверку гуида на существование можно сделать
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/login" element={<Navigate to="/" replace/>}/>
            <Route path="/register/:guid" element={<RegisterForm/>}/>
        </Routes>
    )
}