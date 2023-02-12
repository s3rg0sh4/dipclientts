import {Route, Routes, useNavigate} from "react-router-dom"
import {Status} from "./Status";
import React from "react";
import {NaturalPerson} from "./NaturalPerson";
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
                <Button className="m-3" onClick={handleLogout}>Выйти</Button>
            </Nav>
            <Routes>
                <Route path="/status" element={<Status/>}/>
                <Route path="/create" element={<NaturalPerson/>}/>
            </Routes>
        </div>
    )
}