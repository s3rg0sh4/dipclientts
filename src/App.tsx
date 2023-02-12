import React, {useEffect} from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {PrivateRoutes} from "./components";
import {useAppSelector} from "./hooks/redux";
import {PublicRoutes} from "./components/PublicRoutes";
import {authApi} from "./service/authApi";

function App() {
    const [refresh, result] = authApi.useUpdateTokenMutation();
    useEffect(()=>{
        refresh()
    },[]);
    const isAuth = useAppSelector(state => state.auth.isAuth);


    return (
        <div>
            <Routes>
                {isAuth
                        ? <Route path='/*' element={<PrivateRoutes/>}/>
                        : <Route path="/*" element={<PublicRoutes/>}/>
                }
                {/*<Route path="*" element={<Navigate to="/" replace/>}/>*/}
            </Routes>
        </div>
    );
};

export default App;
