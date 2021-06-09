import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { Pivot as Hamburger } from 'hamburger-react'

import user from 'reducers/user'
import feeling from 'reducers/feeling'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'

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


const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()

  const onSignOutClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setErrors(null))
      dispatch(feeling.actions.setFeelings([]))
    })

    localStorage.removeItem('user')
  }

  return (
    <Nav>
      <Logo href="#">
        moody
      </Logo>
      {accessToken &&
        <Avatar alt="Remy Sharp" src="./assets/card1.jpg" />
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
            <MenuLink href="#">Home</MenuLink>
            <MenuLink href="#">About</MenuLink>
            <MenuLink href="#">Contact</MenuLink>
          </Menu>
        </>}
      {accessToken &&
        <ButtonsWrapper>
          <Button onClick={onSignOutClick}>Sign out</Button>
        </ButtonsWrapper>}
    </Nav>
  )
}

export default Navbar