import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Loader = lazy(() => import('../components/loader/Loader.jsx'));
const Administradores = lazy(() => import('../pages/administradores/Administradores.jsx'));
const Estudiantes = lazy(() => import("../pages/estudiantes/Estudiantes.jsx"));
const Usuarios = lazy(() => import("../pages/usuarios/Usuarios.jsx"));

const UsuariosContextProvider = lazy(() => import("../context/Usuarios.context.jsx"));

const ProtectedRoutes = lazy(() => import("./Protected.routes.jsx"));


const PublicRoutes = () => {



    return (
        <Suspense fallback={<Loader/>}>
                <UsuariosContextProvider>
                    <Routes>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path="/administradores" element={<Administradores/>} />
                                <Route path="/usuarios" element={<Usuarios/>} />
                            <Route path="/estudiantes" element={<Estudiantes/>} />
                        </Route>
                    </Routes>
                </UsuariosContextProvider>
        </Suspense>
    );
}

export default PublicRoutes;
