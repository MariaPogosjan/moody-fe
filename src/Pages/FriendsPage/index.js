import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import FriendsList from './FriendsList'
import RequestsList from './RequestsList'
import SearchForm from './SearchForm'
import ButtonsPanel from './ButtonsPanel'

const FriendsPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  const [tab, setTab] = useState('friends');

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])


  return (
    <PageContainer>
      <ButtonsPanel tab={tab} setTab={setTab}/>
      {tab === "friends" &&<FriendsList />}
      {tab === "requests" &&<RequestsList />}
      {tab === "search" &&<SearchForm />}
    </PageContainer>
  )
}

export default FriendsPage

const PageContainer = styled.div`
  display: flex;
  width:100%;
  flex-direction: column;
  padding-bottom: 70px;
`