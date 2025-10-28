import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

function MyNav() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Navbar
      expand="lg"
      bg={isDark ? "dark" : "light"}
      variant={isDark ? "dark" : "light"}
    >
      <Container className="d-flex justify-content-between">
        <Navbar.Brand as={Link} to="/">
          Electric Bikes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/create-bike" className="mx-2">
              Create Bike
            </Nav.Link>
            {/* <NavDropdown
              title="Categories"
              id="basic-nav-dropdown"
              className="mx-2"
            >
              <NavDropdown.Item href="#action/3.1">
                Mountain Bikes
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">City Bikes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Sport Bikes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                All Categories
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>

      <Button
        variant="primary"
        onClick={toggleTheme}
        className="d-flex align-items-center"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        <span className="ms-2 d-none d-md-inline">
          {isDark ? "Light" : "Dark"}
        </span>
      </Button>
    </Navbar>
  );
}

export default MyNav;
