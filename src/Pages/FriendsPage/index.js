import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import socketIOClient from "socket.io-client"

import FriendsList from './FriendsList'
import RequestsList from './RequestsList'
import SearchForm from './SearchForm'

const ENDPOINT = "http://127.0.0.1:8080"


const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`

const FriendsPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("FromAPI", data => {
      console.log(data)
    })
  }, [])

  
  return (
    <PageContainer>
      <FriendsList />
      <RequestsList />
      <SearchForm />
    </PageContainer>
  )
}

export default FriendsPage