import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from './hooks/redux';
import { authApi } from './service/authApi';
import { useEffect } from 'react';
import { PrivateRoutes, PublicRoutes } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [refresh] = authApi.useUpdateTokenMutation();

    useEffect(() => {
        if (localStorage.length > 0) {
            refresh();
        }
    }, [refresh]);


    const isAuth = useAppSelector(state => state.auth.isAuth);
    const stage = useAppSelector(state => state.hiringStatus);

    return (
        <div>
            <Routes>
                {isAuth
                    ? <Route path='/*' element={<PrivateRoutes />} />
                    : <Route path="/*" element={<PublicRoutes />} />
                }
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
