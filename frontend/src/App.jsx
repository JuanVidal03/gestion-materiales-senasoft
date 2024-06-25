import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css'

const PublicRoutes = lazy(() => import('./routes/public.routes.jsx'));
const PrivateRoutes = lazy(() => import('./routes/private.routes.jsx'));

import Loader from "./components/loader/Loader.jsx";
const GlobalContextProvider = lazy(() => import("./context/Global.context.jsx"));


function App() {

  return (
    <Suspense fallback={<Loader/>}>
      {/* context */}
      <GlobalContextProvider>
        {/* navegacion */}
        <BrowserRouter>
            <PublicRoutes />
            <PrivateRoutes />
        </BrowserRouter>
      </GlobalContextProvider>
    </Suspense>
  )
}

export default App
