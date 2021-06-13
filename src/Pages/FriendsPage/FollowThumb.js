import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { API_URL } from 'reusables/urls'
import user from 'reducers/user'

const FollowThumb = ({ item }) => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

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
      dispatch(user.actions.addMyFriendRequests(data.id))
    })
}

  return (
    <div>
      <p>{item.username}</p>
      <button onClick={onFollowUser}>
        <AddCircleOutlineIcon />
      </button>
    </div>
  )
}

export default FollowThumb