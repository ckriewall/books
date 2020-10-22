import React from "react";
import { Navbar, NavLink } from "react-bootstrap";

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
          <span className="text-success">KrieBooks</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Fragment>
              <Nav.Link provider='google'>
                {' '}
                <i className='fab fa-google'></i> Login
              </Nav.Link>
            </Fragment>
          </Nav>
        </Navbar.Collapse> */}
      </Navbar>
    </div>
  );
};

export default NavBar;
