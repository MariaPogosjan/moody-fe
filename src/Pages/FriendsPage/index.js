import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
// import io from "socket.io-client"

import FriendsList from './FriendsList'
import RequestsList from './RequestsList'
import SearchForm from './SearchForm'

// const ENDPOINT = "http://127.0.0.1:8080"
// const socket = io("http://localhost:3000/friends")
// const socket = io.connect("http://localhost:8080")


const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`

const FriendsPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  // IO
  // const [state, setState] = useState('')


  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

/*   
  useEffect(() => {
    // connects to BE 
    const socket = socketIOClient(ENDPOINT)
    socket.on("FromAPI", data => {
      console.log(data)
    }) 
   
    socket.on('connection')
  }, [socket])

  const sendMessage  = () => {
    socket.emit("message", 'it works')
  } */

  // socket.on('connection')

 /*  socket.on('follows', (data) => {
    console.log('This is data from FE', data)
  }) */

 /*  const sendMessage  = () => {
    socket.emit("follows", 'it works')
  } */

  return (
    <PageContainer>
{/*       <button onClick={sendMessage}>Test</button>
 */}      <FriendsList />
      <RequestsList />
      <SearchForm />/
    </PageContainer>
  )
}

export default FriendsPage