import { useContext, useState } from "react";
import { GolbalContext } from "../context/Global.context.jsx";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

    const { isAuthenticated } = useContext(GolbalContext);
    if (!isAuthenticated) return <Navigate to="/login" replace/>;

    return <Outlet/>;
}

export default ProtectedRoutes;
