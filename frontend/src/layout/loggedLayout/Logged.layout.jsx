import { lazy, Suspense } from 'react';
import "./loggedLayout.css";

const Loader = lazy(() => import("../../components/loader/Loader.jsx"));
const Sidebar = lazy(() => import("../../components/sidebar/Sidebar.jsx"));
const Navbar = lazy(() => import("../../components/navbar/Navbar.jsx"));



const LoggedLayout = ({children}) => {
    return (
        <Suspense fallback={<Loader/>}>
            <div className='logged-layout'>
                <div className='sidebar'>
                    <Sidebar/>
                </div>
                <div className='logged-layout-content'>
                    <Navbar/>
                    <section className='logged-layout-content-container'>
                        {children}
                    </section>
                </div>
            </div>
        </Suspense>
    );
}

export default LoggedLayout;
