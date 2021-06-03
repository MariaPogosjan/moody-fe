import React, { useState } from 'react'
import {
  A,
  Form,
  Input,
  Button,
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from '@bootstrap-styled/v4';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
  <div className="navbar">
    <Navbar color="faded" light toggleable="lg">
      <Container>
        <div className="d-flex justify-content-between">
          <NavbarBrand tag={A} to="#">Brand</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        </div>
        <Collapse navbar isOpen={isOpen}>
          <Nav navbar className="mr-auto">
            <NavItem>
              <NavLink>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Friends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled>Disabled</NavLink>
            </NavItem>
          </Nav>
          <Form inline className="my-2 my-lg-0">
            <Input className="form-control mr-sm-2" type="text" placeholder="Search" />
            <Button href="#" color="success">Search</Button>
          </Form>
        </Collapse>
      </Container>
    </Navbar>
    </div>
  )

}

export default Header