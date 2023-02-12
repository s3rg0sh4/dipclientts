import {Route, Routes} from "react-router-dom";
import React from "react";
import {LoginForm} from "./LoginForm";
import {RegisterForm} from "./RegisterForm";

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/register/:guid" element={<RegisterForm/>}/>
        </Routes>
    )
}