import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'toast-notification-alert'
import 'react-toastify/dist/ReactToastify.css'
import { io } from 'socket.io-client'


import FriendsList from './FriendsList'
import RequestsList from './RequestsList'
import SearchForm from './SearchForm'


const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`

const FriendsPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  const userId = useSelector(store => store.user.userId)
  const friendRequests = useSelector(store => store.user.friendRequests)
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8080")
  }, [])

  let reciverId = friendRequests
  .filter(friend => friend._id !== userId)
  .map(item => item.username)

  useEffect(() => {
    if(reciverId.length > 0 && accessToken) {
      socket.current.emit("sendnotification", {
        username : reciverId
      }) 
      socket.current.on('newnotification', () => {
        const confirmation = toast.show({title:`${reciverId} wants to follow you`, position: 'topright', type: 'info'})
        if(confirmation) reciverId = []
      })
    }
  }, [reciverId, userId, accessToken])

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  
  return (
    <PageContainer>
      <FriendsList />
      <RequestsList />
      <SearchForm />
    </PageContainer>
  )
}

export default FriendsPage