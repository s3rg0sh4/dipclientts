import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import NaturalPerson from "./components/NaturalPerson";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NaturalPerson/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
};

export default App;
