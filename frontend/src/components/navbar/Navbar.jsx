import { useContext } from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import { GolbalContext } from "../../context/Global.context.jsx";
import { logout } from '../../services/auth.service.js';

const Navbar = () => {

    const { user } = useContext(GolbalContext);
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            const logoutResponse = await logout();
            console.log(logoutResponse);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='navbar'>
            <p className='navbar-welcome'>Bienvenido, {user.length > 0 ? user[0].name : user.name} {user.length > 0 ? user[0].lastName : user.lastName}!</p>
            <div className='user-interactions'>
                <div className='user-badge'>
                    <FontAwesomeIcon className='user-icon' icon={faUser}/>
                    <p>{user.length > 0 ? user[0].username : user.username}</p>
                </div>
                <FontAwesomeIcon
                    onClick={handleLogout}
                    className='logout-icon'
                    icon={faArrowRightFromBracket}
                />
            </div>
        </div>
    );
}

export default Navbar;
