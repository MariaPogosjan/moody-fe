import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from 'reusables/urls'

import user from 'reducers/user'


const RequestsContainer = styled.section`
  padding: 5px;
`
const RequestTitle = styled.h2`
  color: #4C5F6B;
  font-size: 18px;
  
`
const ListContainer = styled.ul`
  padding:0;
`
const Request = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  justify-content: space-between;
`
const RequestNamePicWrapper = styled.div`
  display: flex;
  align-items: center;
`
const AcceptButton = styled.button`
  border-radius: 6px;
  border: none;
  padding: 4px 6px;
  background-color: #bca0bc;
  color: #fff;
`

const RequestsList = () => {
  const friendRequests = useSelector(store => store.user.friendRequests)
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onRequestAccept = (item) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ id: item._id })
    }
    fetch(API_URL('acceptfriends'), options)
      .then(res => res.json())
      .then(data => {
        dispatch(user.actions.addFriends(data.friend))
        dispatch(user.actions.removeFriendRequests(data.friend.id))
        //here we need to fix local storage as well
      })
  }

  return (
    <RequestsContainer>
      <RequestTitle>Friend Requests</RequestTitle>
      <ListContainer>
        {friendRequests.map(item =>
          <Request key={item.id}>
            <RequestNamePicWrapper>
              <Avatar
                alt={item.username && item.username.toUpperCase()}
                src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
                style={{ marginRight: "5px" }}
              />
              {item.username}
            </RequestNamePicWrapper>
            <AcceptButton onClick={() => onRequestAccept(item)}>Accept</AcceptButton>
          </Request>)}
      </ListContainer>
    </RequestsContainer>
  )
}

export default RequestsList