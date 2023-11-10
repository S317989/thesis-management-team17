import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';
import React from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts.js";
import AuthenticationAPI from "../APIs/AuthenticationAPI.jsx";

function Header(props) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogoutSubmit = (event) => {
        event.preventDefault();

        AuthenticationAPI.logoutAPI().then(async response => {
            const data = await response.json();

            if (response.status === 200) {
                setUser(null);
                navigate("/");
            }
        }).catch(error => {
            console.log(error.message);
        })
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header-container">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>
                    Thesis Management
                </Navbar.Brand>

                <Nav className="me-auto">
                    <Link className={"nav-link"}
                        to={("/")}>Home</Link>
                </Nav>

                <Nav className="me-auto">
                    <Link className={"nav-link"}
                        to={("/secure-test")}>Secure Page</Link>
                </Nav>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end">
                    <Offcanvas.Body>
                        {
                            !user ?
                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Button variant="link"
                                        className={"nav-link"}
                                        onClick={() => navigate("/Login")}>Login</Button>
                                </Nav>
                                :
                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Button variant="link"
                                        className={"nav-link"}
                                        onClick={handleLogoutSubmit}>Logout</Button>
                                </Nav>
                        }
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

            </Container>
        </Navbar >
    );
}

export default Header;