import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EventNoteIcon from '@material-ui/icons/EventNote'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import MoodIcon from '@material-ui/icons/Mood'
import styled from 'styled-components'
import { io } from 'socket.io-client'

const Footer = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  const friendRequests = useSelector(store => store.user.friendRequests)
  const color = useRef("footer-icon")
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8080")
  }, [])

  let reciverId = friendRequests
  .filter(friend => friend._id !== userId)
  .map(item => item.username)

  useEffect(() => {
      console.log(reciverId)
      if(reciverId.length > 0 && accessToken) {
        socket.current.emit("sendnotification", {
          username : reciverId
        }) 
        socket.current.on('newnotification', () => {
          // return color.current = "red"
          const confirmation = window.confirm(`${reciverId} want to follow you`)
          if(confirmation) reciverId = []
        })
      }
    }, [reciverId, userId, accessToken])

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
            <PeopleOutlineIcon className={color.current}/>
          </Link>
        </IconsContainer>
        :
        <FooterText>All right reserved © Maria Pogosjan and Ekaterina Klimenko</FooterText>
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
