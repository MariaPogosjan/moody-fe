import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EventNoteIcon from '@material-ui/icons/EventNote'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import MoodIcon from '@material-ui/icons/Mood'
import styled from 'styled-components'

const Footer = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  return (
    <FooterContainer>
      {accessToken ?
        <IconsContainer>
          <Link to="/summary" className="footer-link">
            <EventNoteIcon className="footer-icon"/>
          </Link>
          <Link to="/thoughts" >
            <MailOutlineIcon />
          </Link> 
          <Link to="/profile">
            <MoodIcon className="footer-icon"/>
          </Link>
          <Link to='/friends'>
            <PeopleOutlineIcon className="footer-icon"/>
          </Link>
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
