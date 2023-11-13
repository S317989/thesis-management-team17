import "../Stylesheets/LoginStyle.css";

import LoginForm from "../Components/LoginForm.jsx";
import Container from "react-bootstrap/Container";
import { Link, useHref } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Login() {

    const navigate = useNavigate();

    const handleSAMLLogin = () => {
        /*fetch('http://localhost:3000/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    navigate('/');
                } else {
                    console.error('Failed to initiate SAML authentication');
                }
            })
            .catch(error => {
                console.error('Error initiating SAML authentication', error);
            });*/
    };

    return (
        <div className="login-div">
            <Container className="login-container">
                <h1>Login</h1>
                <Button variant="primary" href="http://localhost:3000/login">Login with SAML</Button>
            </Container>
        </div>
    );
}


export default Login;