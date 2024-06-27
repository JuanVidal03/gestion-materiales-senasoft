import LogInForm from "../../components/logInForm/LogInForm.jsx";
import './login.css';

const Login = () => {

    document.title = "Ingresa - Gestor de Materiales";

    return (
        <div className="login">
            <LogInForm />
        </div>
    );
}

export default Login;
