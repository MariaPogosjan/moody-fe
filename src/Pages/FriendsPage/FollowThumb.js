import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar'

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
        console.log(data.friend)
        dispatch(user.actions.addMyFriendRequests(data.friend))
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
        setButtonText(<AddCircleOutlineIcon/>)
      }
    }

    checkFriendsArrays(item)
  }, [item, myFriendRequests, friendsList, friendRequests, userId])

  // const checkFriedsArraysAgain = (item) => {
  //   if(userId === item._id) {
  //     return "You"
  //   } else if(myFriendRequests.find(request => request._id === item._id)){
  //     return "Requested"
  //   } else if(friendsList.find(friend => friend._id === item._id)) {
  //     return "Friend"
  //   } else if(friendRequests.find(friend => friend._id === item._id)) {
  //     return "Accept"
  //   } else {
  //     return <AddCircleOutlineIcon />
  //   }
  // }

  return (
    <div>
      <p>{item.username}</p>
      <Avatar alt={item.username.toUpperCase()} src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`} />
      <button
        onClick={onFollowUser}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default FollowThumb