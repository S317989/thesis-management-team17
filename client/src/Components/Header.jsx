import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button, Form } from 'react-bootstrap';
import React from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts.js";
import AuthenticationAPI from "../APIs/AuthenticationAPI.jsx";
import { useEffect, useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";


function Header(props) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header-container">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>
                    Thesis Management
                </Navbar.Brand>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />

                <Nav className="me-auto">
                    <Link className={"nav-link"}
                        to={("/")}>Home</Link>

                </Nav>
                {
                    !user ? null :
                        <>
                            {
                                user.role === "Student" ?
                                    <>
                                        <Nav className="me-auto">
                                            <Link className={"nav-link"}
                                                to={("/proposals")}>Proposals</Link>
                                        </Nav>

                                        <Nav className="me-auto">
                                            <Link className={"nav-link"}
                                                to={("/application-decisions")}>My Applications</Link>
                                        </Nav>

                                    </>
                                    :
                                    <>
                                        <Nav className="me-auto">
                                            <Link className={"nav-link"} to={("/my-proposals")}>My Proposals</Link>
                                        </Nav>

                                        <Nav className="me-auto">
                                            <Link className={"nav-link"} to={("/browse-proposals")}>All Proposals</Link>
                                        </Nav>

                                        <Nav className="me-auto">
                                            <Link className={"nav-link"} to={("/browse-applications")}>Applications</Link>
                                        </Nav>

                                    </>
                            }
                        </>
                }

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end">
                    <Offcanvas.Body>
                        {
                            !user ?
                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Nav.Link className="icon-link" onMouseOver={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)} style={{ color: "white" }}>
                                        <PersonCircle />
                                        {
                                            isHovered ? `Not Authenticated` : null
                                        }
                                    </Nav.Link>
                                    <Button variant="link"
                                        className={"nav-link"}
                                        href="http://localhost:3000/login">Login</Button>
                                </Nav>
                                :
                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Nav.Link className="icon-link" onMouseOver={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)} style={{ color: "white" }}>
                                        <PersonCircle />
                                        {
                                            !isHovered ? user.id : `Authenticated as ${user.role}`
                                        }
                                    </Nav.Link>

                                    <Button variant="link"
                                        className={"nav-link"}
                                        href="http://localhost:3000/logout">Logout</Button>
                                </Nav>
                        }
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;