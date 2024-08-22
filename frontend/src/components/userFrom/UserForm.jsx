import {useContext} from 'react';
import "./userForm.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { GolbalContext } from '../../context/Global.context.jsx';


const UserForm = () => {

    const { setStateModal } = useContext(GolbalContext);

    return (
        <div className='user-form'>
            <FontAwesomeIcon
                className='user-form-icon'
                onClick={() => setStateModal(false)}
                icon={faCircleXmark}
            />
            <h4>Ingresa un Usuario</h4>
            <form>
                <div className='user-form-input-container'>
                    <label>Nombre de usuario:*</label>
                    <input type="text" required/>
                </div>
                <div className='user-form-input-container'>
                    <label>Contraseña:*</label>
                    <input type="password" required/>
                </div>
                <div className='user-form-input-container'>
                    <label>Nombres:*</label>
                    <input type="text" required/>
                </div>
                <div className='user-form-input-container'>
                    <label>Apellidos:*</label>
                    <input type="text" required/>
                </div>
                <div className='user-form-input-container'>
                    <label>E-mail:*</label>
                    <input type="email" required/>
                </div>
                <div className='user-form-input-container'>
                    <label>Apellidos:*</label>
                    <input type="text" required/>
                </div>

                <div className='user-form-btns-container'>
                    <button className='aceptar-btn'>Aceptar</button>
                    <button className='cancelar-btn'>Cancelar</button>
                </div>

            </form>
        </div>
    );
}

export default UserForm;
