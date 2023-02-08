import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {LoginForm, PrivateRoutes} from "./components";
import {useAppSelector} from "./hooks/redux";
import {stat} from "fs";

function App() {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    return (
        <div>
            <Routes>
                {isAuth
                        ? <Route path='/*' element={<PrivateRoutes />}/>
                        : <Route path="/login" element={<LoginForm/>}/>
                }
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
        </div>
    );
};

export default App;
