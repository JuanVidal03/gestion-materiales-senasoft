import { lazy,Suspense, useContext } from 'react';
import "./sidebar.css";
import logoSena from "../../assets/logoSena.png";
import { faBook, faHandshakeSimple, faPenNib, faTruck, faUser, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons';

const SidebarMenuItem = lazy(() => import("../../components/siderbarMenuItem/SidebarMenuItem.jsx"));
const Loader = lazy(() => import("../../components/loader/Loader.jsx"));

import { GolbalContext } from "../../context/Global.context.jsx";


const Sidebar = () => {
    // items del menu a renderizar
    const menuItems = [
        { menuitemMenu: "Usuarios", icon: faUser, admin:true, delivery: false, student: false, url: "/usuarios" },
        { menuitemMenu: "Materiales", icon: faPenNib, admin:true, delivery: false, student: false, url: "/materiales" },
        { menuitemMenu: "Mis Materiales", icon: faBook, admin: false, delivery: false, student: true, url: "/mis-materiales" },
        { menuitemMenu: "Entregas", icon: faHandshakeSimple, admin:true, delivery: true, student: false, url: "/entregas" },
    ]

    const { user } = useContext(GolbalContext);
    
    return (
        <Suspense fallback={<Loader/>}>
            <div className='sidebar-container'>
                <figure className='logo-sena-container'>
                    <img src={logoSena} alt="" />
                </figure>
                <h5>Gestion Materiales SENA C.T.P.I</h5>
                <div className='sidebar-menu-items'>
                    {
                        menuItems?.map((menuItem, index) => {
                            // agregar otros usuarios con otros roles
                            return (
                            <SidebarMenuItem
                                key={index}
                                icon={menuItem.icon}
                                url={menuItem.url}
                                itemMenu={menuItem.menuitemMenu}
                            />)
                        })
                    }
                </div>
            </div>
        </Suspense>
    );
}

export default Sidebar;
