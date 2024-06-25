import { useContext, useState } from "react";
import { GolbalContext } from "../context/Global.context.jsx";
import { Navigate, Outlet } from "react-router-dom";

import Loader from "../components/loader/Loader.jsx";

const ProtectedRoutes = () => {

    const { isAuthenticated, loading } = useContext(GolbalContext);

    if (loading) return <Loader/>
    if (!loading && !isAuthenticated) return <Navigate to="/login" replace/>;

    return <Outlet/>;
}

export default ProtectedRoutes;
