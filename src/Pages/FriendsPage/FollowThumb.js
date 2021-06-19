import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'
// import { io } from "socket.io-client"

import { API_URL } from 'reusables/urls'
import user from 'reducers/user'

const FollowThumb = ({ item }) => {
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("")
  const myFriendRequests = useSelector(store => store.user.myFriendRequests)
  const friendsList = useSelector(store => store.user.friends)
  const accessToken = useSelector(store => store.user.accessToken)
  const friendRequests = useSelector(store => store.user.friendRequests)
  const dispatch = useDispatch()
  const userId = useSelector(store => store.user.userId)

  // const socket = useRef()

  // useEffect(() => {
  //     socket.current = io("ws://localhost:8080")

  //   }, [])

  // runs just ones
  // useEffect(() => {
  //   socket.current = io("ws://localhost:8080")
  //   socket.current.on("alert", data => {
  //     if(data) {
  //       alert('Du har en ny följare')
  //     } else {
  //       console.log("problem!")
  //     }
  //   }) 
  // }, [])


  // useEffect(() => {
  //   socket.current.emit("addUser", userId)
  //   socket.current.on("getUsers", users => {
     
  //   })
  // }, [userId, friendRequests])
  
  
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
      })

      // const reciverId = friendRequests.filter(friend => friend._id !== userId)
      // if(reciverId) {
      //   socket.current.emit("sendnotification", {
      //     username : reciverId
      //   })
      // }

      // socket.current.on('newnotification', (resp) => {
      //   alert(resp, 'New notification')
      // })
      //  socket.current.emit("sendMessage", {
      //   reciverId
      // }) 
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


 
  return (
    <User>
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
