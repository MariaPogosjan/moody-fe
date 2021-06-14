import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar'

import { API_URL } from 'reusables/urls'
import user from 'reducers/user'

const FollowThumb = ({ item }) => {
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
    body: JSON.stringify({id: item._id})
  }
  fetch(API_URL('follow'), options)
    .then(res => res.json())
    .then(data => {
      dispatch(user.actions.addMyFriendRequests(data.friend))
    })
}
  const checkFriedsArrays = (item) => {
    console.log("function item", item)
    if(userId === item._id) {
      console.log("true1")
      return true
    } else if(myFriendRequests.find(request => request._id === item._id)){
      console.log("true2")
      return true
    } else if(friendsList.find(friend => friend._id === item._id)) {
      console.log("true3")
      return true
    } else if(friendRequests.find(friend => friend._id === item._id)) {
      console.log("true4")
      return true
    } else {
      console.log("false")
      return false
    }
  }

  return (
    <div>
      <p>{item.username}</p>
      <Avatar alt={item.username.toUpperCase()} src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`} />
      <button 
        onClick={onFollowUser}
        disabled={checkFriedsArrays(item)}
      >
        <AddCircleOutlineIcon />
      </button>
    </div>
  )
}

export default FollowThumb