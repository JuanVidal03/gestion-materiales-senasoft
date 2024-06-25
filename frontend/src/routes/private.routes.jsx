import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import('../pages/home/Home.jsx'));
const Loader = lazy(() => import('../components/loader/Loader.jsx'));

const ProtectedRoutes = lazy(() => import("./Protected.routes.jsx"));


const PublicRoutes = () => {
    return (
        <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/" element={<Home/>} />
                    </Route>
                </Routes>
        </Suspense>
    );
}

export default PublicRoutes;
