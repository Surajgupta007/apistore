import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          🌤️ API Apps
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            
            <NavDropdown title="📡 APIs" id="api-dropdown" className="nav-dropdown-custom">
              <NavDropdown.Item as={Link} to="/weather" className="dropdown-item-custom">
                🌤️ Weather API
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/recipes" className="dropdown-item-custom">
                🍽️ Recipe API
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products" className="dropdown-item-custom">
                🛍️ E-Commerce API
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/movies" className="dropdown-item-custom">
                🎬 Movies API
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
