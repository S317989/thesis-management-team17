import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';
import { OAuthError, useAuth0 } from "@auth0/auth0-react";

function Header(props) {
    const navigate = useNavigate();
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header-container">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>
                    Thesis Management
                </Navbar.Brand>

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
                            !isAuthenticated ?
                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Button variant="link"
                                        className={"nav-link"}
                                        onClick={() => loginWithRedirect()}>Login</Button>
                                </Nav>
                                :
                                <Nav className="justify-content-end flex-grow-1 me-auto">
                                    <Button variant="link"
                                        className={"nav-link"}
                                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin + "/home" } })}>Logout</Button>
                                </Nav>
                        }
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

            </Container>
        </Navbar >
    );
}

export default Header;