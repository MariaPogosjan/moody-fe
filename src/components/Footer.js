import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import EventNoteIcon from '@material-ui/icons/EventNote'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import MoodIcon from '@material-ui/icons/Mood'
import styled from 'styled-components'


const style = {
  borderRadius: "50%",
  backgroundColor: "#404167",
  fontWeight: "bold",
  color: "#ffff"
}

const Footer = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  return (
    <FooterContainer>
      {accessToken ?
        <IconsContainer>
          <NavLink
            to="/summary"
            className="footer-link"
            activeStyle={style}
          >
            <EventNoteIcon className="footer-icon" />
          </NavLink>
          <NavLink
            to="/thoughts"
            className="footer-link"
            activeStyle={style}>
            <MailOutlineIcon className="footer-icon" />
          </NavLink>
          <NavLink
            to="/profile"
            className="footer-link"
            activeStyle={style}

          >
            <MoodIcon className="footer-icon" />
          </NavLink>
          <NavLink
            to='/friends'
            className="footer-link"
            activeStyle={style}
          >
            <PeopleOutlineIcon className="footer-icon" />
          </NavLink>
        </IconsContainer>
        :
        <FooterText> © Maria Pogosjan & Ekaterina Klimenko</FooterText>
      }

    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0; 
  left: 0;
  height: 3rem;
  padding: 0 3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #EEECFB;
  color: #404167;
`
const FooterText = styled.p`
  text-align: center;
  font-size: 0.6rem;
  color: grey;

  @media (min-width: 768px) {
      font-size: 0.8rem;
    }
`
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`
