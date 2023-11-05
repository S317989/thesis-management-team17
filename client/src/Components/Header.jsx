import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';
import { useKeycloak } from "@react-keycloak/web";

function Header(props) {
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak();

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
                        {keycloak.authenticated && (
                            <Nav className="justify-content-end flex-grow-1 me-auto">
                                <Button variant="link"
                                    className={"nav-link"}
                                    onClick={() => navigate("/Login")}>Login</Button>
                            </Nav>
                        )}

                        {!!keycloak.authenticated && (
                            <Nav className="justify-content-end flex-grow-1 me-auto">
                                <Button variant="link"
                                    className={"nav-link"}
                                    onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username}) </Button>
                            </Nav>
                        )}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

            </Container>
        </Navbar>
    );
}

export default Header;