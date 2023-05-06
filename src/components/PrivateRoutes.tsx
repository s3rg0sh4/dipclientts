import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Status } from "./Status";
import React from "react";
import { Button, Nav } from "react-bootstrap";
import { authApi } from "../service/authApi";
import { useAppSelector } from "../hooks/redux";
import { HiringStage } from "../enums";
import NaturalPersonForm from "./NaturalPersonForm";
import ConfirmationPage from "./ConfirmationPage";

export const PrivateRoutes = () => {
    const [logout] = authApi.useLogoutMutation();

    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const stage = useAppSelector(state => state.hiringStatus);

    
    const route = () => {
        switch (stage) {
            case HiringStage.Start:
                return <Route path="/" element={<NaturalPersonForm />} />
            case HiringStage.CreatingNaturalPerson:
                return <Route path="/" element={<span>status</span>} />
            default:
                return <Route path="/" element={<span>default</span>} />
        }
    }


    return (
        <div className='col-md-6 offset-md-3'>
            <Routes>
                <Route path="/confirm" element={<ConfirmationPage/>}/>
                {route()}
            </Routes>
        </div>
    )
}