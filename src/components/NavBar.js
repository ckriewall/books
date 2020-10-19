import React, { Fragment } from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        className="mb-4"
        sticky="top"
      >
        <Navbar.Brand as={NavLink} href="/">
          <span className="text-success">Books</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" bg="light">
            <Nav.Link as={NavLink} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} href="repos">
              Repos
            </Nav.Link>
          </Nav>
          <Nav>
            <Fragment>
              <Nav.Link provider="google">
                {" "}
                <i className="fab fa-google"></i> Login
              </Nav.Link>
            </Fragment>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
