import './logInForm.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons"

import { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/auth.service.js';

import { GolbalContext } from '../../context/Global.context.jsx';

const LogInForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setUser, setIsAuthenticated } = useContext(GolbalContext); // contexto de usuario

    const handleSubmit = async() => {

        try {
            const authUser = await login(username, password);
            console.log(authUser.data.user);
            
            if (!authUser) {
                toast.error('Usuario o contraseña incorrectos.');
            }

            setUser(authUser.data.user);
            setIsAuthenticated(true);
            authUser.status === 200 && navigate('/');

        } catch (error) {
            console.log(error);
            setUser(null);
        }
    }

    return (
        <div className="loginForm">
            <ToastContainer/>
            <div className='loginForm-welcome-message'>
                <h1>Bienvenido de vuelta!</h1>
                <p>Te estabamos esperando.</p>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div className='logInForm-input-container'>
                    <label>Usuario*</label>
                    <input
                        type="text"
                        placeholder='Ingresa tu nombre de Usuario'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='logInForm-input-container'>
                    <label>Contraseña*</label>
                    <input
                        type="password"
                        placeholder='Ingresa tu contraseña'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input
                    className='loginForm-submit'
                    type="submit"
                    value="Ingresar"
                />
            </form>
            <div className='loginForm-icon-container'>
                <FontAwesomeIcon className='loginForm-Icon' icon={faInstagram} />
                <FontAwesomeIcon className='loginForm-Icon' icon={faXTwitter} />
                <FontAwesomeIcon className='loginForm-Icon' icon={faGoogle} />
                <FontAwesomeIcon className='loginForm-Icon' icon={faFacebook} />
            </div>
        </div>
    );
}

export default LogInForm;
