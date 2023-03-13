import Container from "@mui/material/Container/Container";
import React, {useEffect} from "react";
import {Route, Routes} from 'react-router-dom';
import {PrivateRoutes, PublicRoutes} from "./components";
import {useAppSelector} from "./hooks/redux";
import {authApi} from "./service/authApi";

function App() {
    const [refresh] = authApi.useUpdateTokenMutation();
    useEffect(() => {
        refresh();
    }, [refresh]);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    return (
        <Container>
            <Routes>
                {isAuth
                    ? <Route path='/*' element={<PrivateRoutes/>}/>
                    : <Route path="/*" element={<PublicRoutes/>}/>
                }
                {/*<Route path="*" element={<Navigate to="/" replace/>}/>*/}
            </Routes>
        </Container>
    );
}

export default App;
