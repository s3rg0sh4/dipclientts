import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {Status} from "./Status";
import React from "react";
import {Button, Nav} from "react-bootstrap";
import {authApi} from "../service/authApi";

export const PrivateRoutes = () => {
    const [logout] = authApi.useLogoutMutation();

    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return (
        <div>
            <Nav>
                <Button variant="danger" className="m-3" onClick={handleLogout}>Выйти</Button>
            </Nav>
            <Routes>

            </Routes>
        </div>
    )
}