import {Route, Routes} from 'react-router-dom';

import NaturalPersonFormPages from './components/NaturalPersonFormPages';

function App() {
    // const [refresh] = authApi.useUpdateTokenMutation();
    // useEffect(() => {
    //     refresh();
    // }, [refresh]);
    // const isAuth = useAppSelector(state => state.auth.isAuth);

    return (
        <div>
            <Routes>
                <Route path="/*" element={<NaturalPersonFormPages/>}/>
            </Routes>
            {/* <Routes>
                {isAuth
                    ? <Route path='/*' element={<PrivateRoutes/>}/>
                    : <Route path="/*" element={<PublicRoutes/>}/>
                }
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes> */}
        </div>
    );
}

export default App;
