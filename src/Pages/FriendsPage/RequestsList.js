import React from 'react'
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
const Button = styled.button`
  border-radius: 6px;
  border: none;
  padding: 4px 6px;
  background-color: #bca0bc;
  color: #fff;
`
const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
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
      .then(data =>  {
         dispatch(user.actions.addFriends(data.friend))
         dispatch(user.actions.removeFriendRequests(data.friend._id))
        // localStorage.setItem('friends', JSON.stringify({ friends }))
        // localStorage.setItem('friendRequests', JSON.stringify({ friendRequests }))
        //here we need to fix local storage as well
      })
     
  }

  const onRequestDeny = (item) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ id: item._id })
    }
    fetch(API_URL('denyfriends'), options)
      .then(res => res.json())
      .then(data => {
        dispatch(user.actions.removeFriendRequests(data.friend._id))
        //here we need to fix local storage as well
        // localStorage.setItem('friends', JSON.stringify({ friends }))
        // localStorage.setItem('friendRequests', JSON.stringify({ friendRequests }))
      })
  }

  return (
    <RequestsContainer>
      <RequestTitle>Friend Requests</RequestTitle>
      <ListContainer>
        {friendRequests.map(item =>
          <Request key={item._id}>
            <RequestNamePicWrapper>
              <Avatar
                alt={item.username && item.username.toUpperCase()}
                src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
                style={{ marginRight: "5px" }}
              />
              {item.username}
            </RequestNamePicWrapper>
            <ButtonsWrapper>
              <Button onClick={() => onRequestAccept(item)}>Accept</Button>
              <Button onClick={() => onRequestDeny(item)}>Deny</Button>
            </ButtonsWrapper>
          </Request>)}
      </ListContainer>
    </RequestsContainer>
  )
}

export default RequestsList