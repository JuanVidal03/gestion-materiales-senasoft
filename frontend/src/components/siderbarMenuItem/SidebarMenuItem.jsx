import React from 'react';
import './sidebarMenuItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom"

const SidebarMenuItem = ({itemMenu, icon, url}) => {
    
    return (
        <li className='sidebar-menu-item'>
            <NavLink
             className={({isActive}) => isActive ? "active-menu-item" : "sidebar-menu-item-nav"}
             to={url}
            > 
                <FontAwesomeIcon 
                    className='sidebar-menu-item-icon'
                    icon={icon}/>
                <p className='sidebar-menu-item-text'>{itemMenu}</p>
            </NavLink>
        </li>
    );
}

export default SidebarMenuItem;
