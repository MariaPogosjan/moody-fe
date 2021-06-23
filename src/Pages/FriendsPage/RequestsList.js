import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from 'reusables/urls'

import user from 'reducers/user'
import image from 'assets/friends.jpg'

const RequestsList = () => {
  const friendRequests = useSelector(store => store.user.friendRequests)
  const accessToken = useSelector(store => store.user.accessToken)
  const friendsList = useSelector(store => store.user.friends)
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
        dispatch(user.actions.removeFriendRequests(data.friend._id))
        const updatedFriendRequests = friendRequests.filter(item => item._id !== data.friend._id)
        const updatedFriends = [data.friend, ...friendsList]
        localStorage.setItem('friends', JSON.stringify({ friends: updatedFriends }))
        localStorage.setItem('friendRequests', JSON.stringify({ friendRequests: updatedFriendRequests }))
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
        const updatedFriendRequests = friendRequests.filter(item => item._id !== data.friend._id)
        localStorage.setItem('friendRequests', JSON.stringify({ friendRequests: updatedFriendRequests }))
      })
  }

  return (
    <RequestsContainer>
      <ListContainer>
        <RequestTitle>Friend Requests</RequestTitle>
        {friendRequests.length === 0 &&
          <>
            <Text>No pending requests</Text>
            <Image src={image} alt="Friends online" />
          </>
        }
        {friendRequests.map(item =>
          <Request key={item._id}>
            <RequestNamePicWrapper>
              <Avatar
                alt={item.username && item.username.toUpperCase()}
                src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
                style={{ marginRight: "5px" }}
              />
              <Name>{item.username}</Name>
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

const RequestsContainer = styled.section`
  padding: 5px;
`
const RequestTitle = styled.h2`
  color: #4C5F6B;
  font-size: 18px;
  margin-bottom: 25px;
`
const ListContainer = styled.ul`
  padding:0;
  max-width: 450px;
  margin: auto;
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
const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
`
const Name = styled.p`
  color: #2a363c;
`
const Button = styled.button`
  border-radius: 6px;
  border: none;
  padding: 4px 6px;
  background-color: #4C5F6B;
  color: #fff;
  width: 60px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    opacity: 80%;
  }

  @media(min-width: 650px) {
    width: 100px;
  }
`
const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Image = styled.img`
  width: 100%;
`