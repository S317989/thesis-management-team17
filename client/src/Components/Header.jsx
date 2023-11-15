import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Button,Form } from 'react-bootstrap';

function Header(props) {
    const navigate = useNavigate();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header-container">




            
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>
                    Thesis Management
                </Navbar.Brand>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />

                <Navbar.Collapse className="justify-content-end">
          
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end">
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 me-auto">
                            <Button variant="link"
                                className={"nav-link"}
                                onClick={() => navigate("/Login")}>Login</Button>
                        </Nav>

                        <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    </Offcanvas.Body>                    
                </Navbar.Offcanvas>
        </Navbar.Collapse>

               
                

            </Container>
        </Navbar>
    );
}

export default Header;