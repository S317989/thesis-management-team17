import "../Stylesheets/LoginStyle.css";

import LoginForm from "../Components/LoginForm.jsx";
import Container from "react-bootstrap/Container";

function Login() {
    return (
        <div className="login-div">
            <Container className="login-container">
                <h1>Login</h1>
                <LoginForm />
            </Container>
        </div>
    );
}


export default Login;