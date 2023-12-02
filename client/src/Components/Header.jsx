import React, { useContext, useState } from "react";
import "../Stylesheets/HeaderStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import VirtualClockComponent from "./VirtualClockComponent.jsx";
import { UserContext } from "../Contexts.js";

function Header() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isOffcanvasActive, setIsOffcanvasActive] = useState(false);
    const { user } = useContext(UserContext);

    const handleOffcanvasToggle = () => {
        setIsOffcanvasActive(!isOffcanvasActive);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header-container">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>
                    Thesis Management
                </Navbar.Brand>

                <Navbar.Toggle aria-controls={`offcanvasNavbar`} />

                <Navbar.Collapse id={`offcanvasNavbar`} className="justify-content-end">
                    <Nav className="me-auto">
                        <Link className={"nav-link"} to={("/")}>
                            Home
                        </Link>

                        {user && (
                            <>
                                {user.role === "Student" ? (
                                    <Link className={"nav-link"} to={("/student-applications")}>
                                        Thesis Proposals
                                    </Link>
                                ) : (
                                    <>
                                        <Link className={"nav-link"} to={("/my-proposals")}>
                                            My Proposals
                                        </Link>
                                        <Link className={"nav-link"} to={("/browse-proposals")}>
                                            All Proposals
                                        </Link>
                                        <Link className={"nav-link"} to={("/browse-applications")}>
                                            Applications
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                    </Nav>

                    <Nav>
                        {!user ? (
                            <>
                                <Nav.Link
                                    className="nav-link"
                                    onMouseOver={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <PersonCircle />
                                    {isHovered ? `Not Authenticated` : null}
                                </Nav.Link>

                                <Button
                                    variant="link"
                                    className={"nav-link"}
                                    href="http://localhost:3000/login"
                                >
                                    Login
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link className={"nav-link"} id="info-items">
                                    <VirtualClockComponent />
                                </Nav.Link>

                                <Nav.Link
                                    className={"nav-link"}
                                    id="info-items"
                                    onMouseOver={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="icon-container">
                                        <PersonCircle />
                                    </div>
                                    <div className="text-container">
                                        <p className="text-content">
                                            {!isHovered ? user.id : `Authenticated as ${user.role}`}
                                        </p>
                                    </div>
                                </Nav.Link>

                                <Button
                                    variant="link"
                                    className={"nav-link"}
                                    href="http://localhost:3000/logout"
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;
