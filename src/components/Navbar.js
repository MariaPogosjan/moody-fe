import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { Pivot as Hamburger } from 'hamburger-react'
import { Link } from 'react-router-dom'



const Nav = styled.div`
  position: sticky;
  height: 80px;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #EEECFB;

  @media (max-width: 768px) {
    height: ${({ isOpen }) => (!isOpen ? "auto" : "0")};
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
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
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
const styles = {
  textDecoration: "none"
}

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const accessToken = useSelector(store => store.user.accessToken)
  const profileImage = useSelector(store => store.user.profileImage)
  const username = useSelector(store => store.user.username)
 
  return (
    <Nav>
      <Link to="/" style={styles}>
        <Logo>
          moody
        </Logo>
      </Link>

      {accessToken &&
        <Link to='/settings' >
          <Avatar alt={username.toUpperCase()} src={profileImage ? profileImage.imageURL : ` /static/images/avatar/1.jpg`} />
        </Link>
      }
      {!accessToken &&
        <>
          <HamburgerButton>
            <Hamburger
              label="Show menu"
              toggled={isOpen}
              toggle={setOpen}
              color="#404167"
            />
          </HamburgerButton>
          <Menu isOpen={isOpen}>
            <MenuLink href="#">
              <Link to='/about' style={styles}>
                About
              </Link>
            </MenuLink>
            <Link to='/contact' style={styles}>
              <MenuLink href="#">Contact</MenuLink>
            </Link>
          </Menu>
        </>}
    </Nav>
  )
}

export default Navbar