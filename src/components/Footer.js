import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EventNoteIcon from '@material-ui/icons/EventNote'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import MoodIcon from '@material-ui/icons/Mood'
import styled from 'styled-components'

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0; 
  left: 0;
  height: 80px;
  padding: 0 3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #EEECFB;
  color: #404167;
`
const FooterText = styled.p`
  text-align: center;
`

const Footer = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  return (
    <FooterContainer>
      {accessToken ?
        <>
          <Link to="/summary">
            <EventNoteIcon />
          </Link>
          <MailOutlineIcon />
          <Link to="/profile">
            <MoodIcon />
          </Link>
          <NotificationsNoneIcon />
          <SearchIcon />
        </>
        :
        <FooterText>Hello there</FooterText>  
      }

    </FooterContainer>
  )
}

export default Footer