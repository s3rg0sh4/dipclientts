import React, {useEffect} from "react";
import {Route, Routes} from 'react-router-dom';
import {PrivateRoutes, PublicRoutes} from "./components";
import {useAppSelector} from "./hooks/redux";
import {authApi} from "./service/authApi";

function App() {
    const [refresh, result] = authApi.useUpdateTokenMutation();
    useEffect(() => {
        refresh();
    }, []);
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
}

export default App;
