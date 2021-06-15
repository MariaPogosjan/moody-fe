import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'


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