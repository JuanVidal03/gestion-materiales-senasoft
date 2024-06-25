import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css'

const PublicRoutes = lazy(() => import('./routes/public.routes.jsx'));
const PrivateRoutes = lazy(() => import('./routes/private.routes.jsx'));

// const Loader = lazy(() => import('./components/loader/Loader.jsx'));
import Loader from "./components/loader/Loader.jsx";


function App() {

  return (
    <Suspense fallback={<Loader/>}>
      <BrowserRouter>
        <PublicRoutes />
        <PrivateRoutes />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
