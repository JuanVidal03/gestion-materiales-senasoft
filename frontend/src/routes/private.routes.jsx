import { Suspense, lazy, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

const Loader = lazy(() => import('../components/loader/Loader.jsx'));
const Usuarios = lazy(() => import("../pages/usuarios/Usuarios.jsx"));
const Materiales = lazy(() => import("../pages/materiales/Materiales.jsx"));
const MisMateriales = lazy(() => import("../pages/misMateriales/MisMateriales.jsx"));
const Entregas = lazy(() => import("../pages/entregas/Entregas.jsx"));

const UsuariosContextProvider = lazy(() => import("../context/Usuarios.context.jsx"));

const ProtectedRoutes = lazy(() => import("./Protected.routes.jsx"));

import { GolbalContext } from "../context/Global.context.jsx";


const PublicRoutes = () => {


    return (
        <Suspense fallback={<Loader/>}>
                <UsuariosContextProvider>
                    <Routes>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path="/usuarios" element={<Usuarios/>} />
                            <Route path="/materiales" element={<Materiales/>}/>
                            <Route path="/mis-materiales" element={<MisMateriales/>} />
                            <Route path="/entregas" element={<MisMateriales/>} />
                            <Route path="/" element={<Usuarios/>} />
                        </Route>
                    </Routes>
                </UsuariosContextProvider>
        </Suspense>
    );
}

export default PublicRoutes;
