import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Login = lazy(() => import('../pages/login/Login.jsx'))
const Loader = lazy(() => import('../components/loader/Loader.jsx'));


const PublicRoutes = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path="/login" Component={Login}/>
            </Routes>
        </Suspense>
    );
}

export default PublicRoutes;
