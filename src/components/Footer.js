import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EventNoteIcon from '@material-ui/icons/EventNote'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import MoodIcon from '@material-ui/icons/Mood'
import styled from 'styled-components'



const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0; 
  left: 0;
  height: 50px;
  padding: 0 3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #EEECFB;
  color: #404167;
`
const FooterText = styled.p`
  text-align: center;
  font-size: 13px;
`
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`

const Footer = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  return (
    <FooterContainer>
      {accessToken ?
        <IconsContainer>
          <Link to="/summary" className="footer-link">
            <EventNoteIcon className="footer-icon"/>
          </Link>
          <MailOutlineIcon />
          <Link to="/profile">
            <MoodIcon className="footer-icon"/>
          </Link>
          <NotificationsNoneIcon />
          <Link to='/friends'>
            <PeopleOutlineIcon className="footer-icon"/>
          </Link>
        </IconsContainer>
        :
        <FooterText>All right reserved © Maria Pogosjan and Ekaterina Klimenko</FooterText>
      }

    </FooterContainer>
  )
}

export default Footer