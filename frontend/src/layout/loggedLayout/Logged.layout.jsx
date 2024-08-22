import { lazy, Suspense, useContext } from 'react';
import "./loggedLayout.css";

const Loader = lazy(() => import("../../components/loader/Loader.jsx"));
const Sidebar = lazy(() => import("../../components/sidebar/Sidebar.jsx"));
const Navbar = lazy(() => import("../../components/navbar/Navbar.jsx"));
const Modal = lazy(() => import("../../components/modal/Modal.jsx"));

import { GolbalContext } from '../../context/Global.context.jsx';


const LoggedLayout = ({children}) => {

    const { stateModal } = useContext(GolbalContext);

    return (
        <Suspense fallback={<Loader/>}>
            <div className='logged-layout'>
                { stateModal && <Modal/> }
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
