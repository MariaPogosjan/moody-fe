import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
// import { io } from "socket.io-client"

import FriendsList from './FriendsList'
import RequestsList from './RequestsList'
import SearchForm from './SearchForm'
// import { current } from 'immer'


const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`

const FriendsPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()


  const friendsList = useSelector(store => store.user.friends)
  //console.log("friendlist", friendsList)
  const userId = useSelector(store => store.user.userId)
  //console.log('maks?', userId)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const friendRequests = useSelector(store => store.user.friendRequests)
  // console.log('friendfråga:', friendRequests)
 
  const socket = useRef()

/*   useEffect(() => {
   socket.current = io("ws://localhost:8080")
   socket.current.on('getMessage', (data) => {
    sender: data.senderId
   }   
  }, [])

 useEffect(() => {
    socket.current.emit("addUser", userId)
    socket.current.on('getUsers', users => {
      console.log("this is 1: ", users)
    })
 }, [userId, friendsList])


 */
  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

 /*  const test = () => {
     friendRequests.find(friend => friend._id !== userId) //
    console.log("this is 2: ",  friendRequests)
    socket.current.emit('getUsers', {
      //senderId: userId,
      friend: friendRequests._id
    }) 
  } */
  

  return (
    <PageContainer>
      <FriendsList />
{/*       <button onClick={test}>Test</button>
 */}
      <RequestsList />
      <SearchForm />
    </PageContainer>
  )
}

export default FriendsPage