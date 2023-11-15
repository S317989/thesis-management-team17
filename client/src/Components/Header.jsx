import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';

function Header(props) {
    const navigate = useNavigate();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header-container">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>
                    Thesis Management
                </Navbar.Brand>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end">
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 me-auto">
                            <Button variant="link"
                                className={"nav-link"}
                                onClick={() => navigate("/Login")}>Login</Button>
                            <Button variant='link' onClick={()=>navigate("/proposal")}>Insert Proposal</Button>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;