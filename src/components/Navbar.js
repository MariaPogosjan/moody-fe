import React, { useState } from 'react'
import styled from 'styled-components'
import { Pivot as Hamburger } from 'hamburger-react'

const Nav = styled.div`
  position: sticky;
  top:0;
  height: 80px;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    height: ${({isOpen}) => (!isOpen ? "auto" : "0")};
  }
`
const Logo = styled.a`
  padding: 2rem 0;
  color: #404167;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
`
const HamburgerButton = styled.div`
  display: none;

  @media (max-width: 768px){
    display: flex;
  }
`
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({isOpen}) => (isOpen ? "300px" : "0")};
  }
`

const MenuLink = styled.a`
  padding: 0.8rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: #404167;
  font-size: 1.1rem;
  transition: all 0.2s ease-in;

    &:hover {
      background-color: #404167;
      color: white;
      border-radius: 6px;
    }
`

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const [navbar, setNavbar] = useState(false)

  const onChangeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  
  window.addEventListener('scroll', onChangeBackground)

  return (
    <Nav className={navbar ? 'colorChange' : 'navbar'}>
      <Logo href="#">
        Moody
      </Logo>
      <HamburgerButton>
        <Hamburger 
          label="Show menu"  
          toggled={isOpen} 
          toggle={setOpen}
          color="#404167" 
        />
      </HamburgerButton>
      <Menu isOpen={isOpen}>
        <MenuLink href="#">Home</MenuLink>
        <MenuLink href="#">About Us</MenuLink>
        <MenuLink href="#">Contact Us</MenuLink>
      </Menu>
    </Nav>
  )

}

export default Navbar