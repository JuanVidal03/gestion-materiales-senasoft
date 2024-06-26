import React from 'react';
import "./sidebar.css";
import logoSena from "../../assets/logoSena.png";

const Sidebar = () => {
    return (
        <div className='sidebar-container'>
            <figure className='logo-sena-container'>
                <img src={logoSena} alt="" />
            </figure>
            <h5>Gestion Materiales SENA C.T.P.I</h5>
        </div>
    );
}

export default Sidebar;
