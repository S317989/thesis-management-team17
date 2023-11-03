import { Alert, Button, Form } from "react-bootstrap";
import { useState } from "react";

function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (e) => {
        // TODO
    };

    return (
        <Form>
            {(errorMessage.length) ? <Alert variant='danger'>{errorMessage}</Alert> : ''}

            <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Label column="lg">Username</Form.Label>
                <Form.Control size="lg" type="text" placeholder="Enter username"
                    value={username}
                    onChange={e => setUsername(e.target.value)} autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label column="lg">Password</Form.Label>
                <Form.Control size="lg" type="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" size="lg" variant="outline-primary" className="float-end" id="login-button"
                onClick={handleLoginSubmit}>
                Login
            </Button>
        </Form>
    )
}

export default LoginForm;