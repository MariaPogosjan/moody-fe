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
      <Link to="/" style={styles}>
        <Logo>
          moody
        </Logo>
      </Link>
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
            <Link to='/about' style={styles}>
              About
            </Link>
            <Link to='/contact' style={styles}>
              Contact
            </Link>
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
const Logo = styled.a`
  color: #404167;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.9rem;

  @media (max-width: 768px) {
     font-size: 1.5rem;
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

// const MenuLink = styled.a`
//   padding: 0.8rem 1rem;
//   margin: 0.5rem;
//   cursor: pointer;
//   text-decoration: none;
//   font-size: 1.1rem;
//   transition: all 0.2s ease-in;
//     &:hover {
//       background-color: #404167;
//       color: white;
//       border-radius: 6px;
//     }
// `
const styles = {
  textDecoration: "none",
  color: "#404167",
  padding: "0.4rem 0rem 0rem 0rem",
  margin: "0.3rem",
  cursor: "pointer",
  textSecoration: "none",
  fontSize: "1rem",
  transition: "all 0.2s ease-in"
}

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