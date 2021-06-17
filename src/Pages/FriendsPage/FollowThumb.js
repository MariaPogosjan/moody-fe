import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'
import io from "socket.io-client"

import { API_URL } from 'reusables/urls'
import user from 'reducers/user'

const socket = io.connect("http://localhost:8080")

const FollowThumb = ({ item }) => {
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("")
  const myFriendRequests = useSelector(store => store.user.myFriendRequests)
  const friendsList = useSelector(store => store.user.friends)
  const accessToken = useSelector(store => store.user.accessToken)
  const friendRequests = useSelector(store => store.user.friendRequests)
  const dispatch = useDispatch()
  const userId = useSelector(store => store.user.userId)

  const onFollowUser = () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ id: item._id })
    }
    fetch(API_URL('follow'), options)
      .then(res => res.json())
      .then(data => {
        dispatch(user.actions.addMyFriendRequests(data.friend))
        
        //socket.emit("follows", data.friend)
        /* socket.emit('join room', {
          message: 'Hej',
          username: data.friend,
          room:room
        }) */
      })      

    
  }

  useEffect(() => {
    const checkFriendsArrays = (item) => {
      if (userId === item._id) {
        setButtonText("You")
        setDisabled(true)
      } else if (myFriendRequests.find(request => request._id === item._id)) {
        setButtonText("Requested")
        setDisabled(true)
      } else if (friendsList.find(friend => friend._id === item._id)) {
        setButtonText("Friend")
        setDisabled(true)
      } else if (friendRequests.find(friend => friend._id === item._id)) {
        setDisabled(true)
        setButtonText("Accept")

      } else {
        setDisabled(false)
        setButtonText(<AddCircleOutlineIcon />)
      }
    }
    checkFriendsArrays(item)
  }, [item, myFriendRequests, friendsList, friendRequests, userId])


  const room = 4001
 
  const test = () => {
    socket.emit('join room', {
      room,
      userId,
      socketId: socket.id
    })   
  }

  const onFollow = () => {
    socket.emit('join room', {
      room,
      userId,
      socketId: socket.id
    })   
    socket.emit('follow', userId)
    // id of the person we want to follow 

    socket.on('notifyAboutFollow', (data) => {
      if (data.message) { 
        console.log(data.message) 
        alert('Hej! :' ) 

        console.log('det funkar!!!') 
      } else {
        console.log("There is a problem:", data)
      }
    })
  }

  return (
    <>
    <User>
        <button onClick={onFollow}>Test</button>
    <UserNamePicWrapper>
        <Avatar
          alt={item.username.toUpperCase()}
          src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
          style={{ marginRight: "5px" }}
        />
        {item.username}
      </UserNamePicWrapper>

      <FollowButton
        onClick={onFollowUser}
        disabled={disabled}
      >
        {buttonText}
      </FollowButton>
    </User>
    </>
  )
}

export default FollowThumb


const User = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  justify-content: space-between;
`
const UserNamePicWrapper = styled.div`
  display: flex;
  align-items: center;
`
const FollowButton = styled.button`
  border-radius: 6px;
  border: none;
  padding: 4px 6px;
  background-color: #bca0bc;
  color: #fff;
    &:disabled {
      opacity: 0.6;
    }
`
