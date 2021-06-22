import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { Pivot as Hamburger } from 'hamburger-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const accessToken = useSelector(store => store.user.accessToken)
  const profileImage = useSelector(store => store.user.profileImage)
  const username = useSelector(store => store.user.username)
  const classes = useStyles()

  return (
    <Nav>
      <LogoLink to="/">
          moody
      </LogoLink>
      {accessToken &&
        <Link to='/settings' >
          <Avatar className={classes.large} alt={username.toUpperCase()} src={profileImage ? profileImage.imageURL : ` /static/images/avatar/1.jpg`} />
        </Link>
      }
      {!accessToken &&
        <>
          <HamburgerButton>
            <Hamburger
              label="Show menu"
              toggled={isOpen}
              toggle={setOpen}
            />
          </HamburgerButton>
          <Menu isOpen={isOpen}>
            <MenuLink >
              About
            </MenuLink>
            <MenuLink to='/contact'>
              Contact
            </MenuLink>
          </Menu>
        </>}
    </Nav>
  )
}

export default Navbar

const Nav = styled.div`
  position: sticky;
  height: 6.5rem;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #EEECFB;

  @media (max-width: 768px) {
    height: ${({ isOpen }) => (!isOpen ? "auto" : "0")};
    padding: 1.1rem;
  }
`

const LogoLink = styled(Link)`
  color: #404167;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.5rem;

  @media (min-width: 768px) {
     font-size: 1.9rem;
  }
`
const HamburgerButton = styled.div`
  display: none;
  color: #404167;
  
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
    max-height: ${({ isOpen }) => (isOpen ? "400px" : "0")};
  }
`

const MenuLink = styled(Link)`
  padding: 0.5rem;
  margin: 0rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  color: #404167;

    @media (min-width: 768px) {
      margin: 10px;
      font-size: 1.1rem;
      transition: all 0.2s ease-in;

      &:hover {
      background-color: #404167;
      color: white;
      border-radius: 6px;   
    }
  }
`

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))