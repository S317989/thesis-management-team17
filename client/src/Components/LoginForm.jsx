import { Alert, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts.js";
import { Navigate } from "react-router-dom";
import AuthenticationAPI from "../APIs/AuthenticationAPI.jsx";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            return;
        }

        AuthenticationAPI.loginAPI(username, password)
            .then(async response => {
                const data = await response.json();

                if (response.status === 200) {
                    setUser(data);
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    return (
        user
            ? <Navigate to="/" />
            : <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label column="lg">Username</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Enter username" value={username}
                        onChange={e => setUsername(e.target.value)} autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label column="lg">Password</Form.Label>
                    <Form.Control size="lg" type="password" placeholder="Password" value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" size="lg" variant="outline-primary" className="float-end" id="login-button"
                    onClick={handleLoginSubmit}>
                    Login
                </Button>
            </Form >
    )
}

export default LoginForm;