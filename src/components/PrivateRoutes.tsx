import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {Status} from "./Status";
import React from "react";
import {NaturalPerson} from "./NaturalPerson";
import {authApi} from "../service/authApi";
import {AppBar, Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

export const PrivateRoutes = () => {
    const [logout] = authApi.useLogoutMutation();

    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return (
        <Container>
            <AppBar position="static" sx={{marginBottom: 1}}>
                <Button variant="contained" onClick={handleLogout}>Выйти</Button>
            </AppBar>
            <Routes>
                <Route path="/status" element={<Status/>}/>
                <Route path="/create" element={<NaturalPerson/>}/>
                {/*времмено, т.к. нет других страниц*/}
                <Route path="*" element={<Navigate to="/create" replace/>}/>
            </Routes>
        </Container>
    )
}