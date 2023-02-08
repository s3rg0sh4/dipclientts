import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {LoginForm, NaturalPerson, Status} from "./components";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/status" element={<Status/>}/>
                <Route path="/" element={<NaturalPerson/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
};

export default App;
