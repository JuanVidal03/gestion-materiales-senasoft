import LogInForm from "../../components/logInForm/LogInForm.jsx";
import './login.css';

const Login = () => {

    document.title = "Ingresa!"

    return (
        <div className="login">
            <LogInForm />
            <div>

            </div>
        </div>
    );
}

export default Login;
