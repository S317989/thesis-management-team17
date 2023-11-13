import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';
import React from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts.js";
import AuthenticationAPI from "../APIs/AuthenticationAPI.jsx";

function Header(props) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

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
                            <>
                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Button variant="link"
                                        className={"nav-link"}
                                        href="http://localhost:3000/login">Login</Button>
                                </Nav>

                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Button variant="link"
                                        className={"nav-link"}
                                        href="http://localhost:3000/logout">Logout</Button>
                                </Nav>
                            </>
                        }
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

            </Container>
        </Navbar >
    );
}

export default Header;