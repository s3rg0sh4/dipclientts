import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {PrivateRoutes} from "./components";
import {useAppSelector} from "./hooks/redux";
import {PublicRoutes} from "./components/PublicRoutes";

function App() {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    
    return (
        <div>
            <Routes>
                {isAuth
                        ? <Route path='/*' element={<PrivateRoutes/>}/>
                        : <Route path="/*" element={<PublicRoutes/>}/>
                }
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    );
};

export default App;
