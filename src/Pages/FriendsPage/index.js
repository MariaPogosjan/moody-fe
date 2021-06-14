import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'

import user from 'reducers/user'
import { API_URL } from 'reusables/urls'
import friends from 'reducers/friends'
import FollowThumb from './FollowThumb'

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid pink;
`
const Form = styled.form`

`
const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const SearchButton = styled.button`

`

const FriendsPage = () => {
  const [value, setValue] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const dispatch = useDispatch()
  const users = useSelector(store => store.friends.friends)
  const accessToken = useSelector(store => store.user.accessToken)
  const friendsList = useSelector(store => store.user.friends)
  const myFriendRequests = useSelector(store => store.user.myFriendRequests)
  const friendRequests = useSelector(store => store.user.friendRequests)
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  useEffect(() => {
    fetch(API_URL('users'))
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        batch(() => {
          dispatch(friends.actions.setFriends(data))
          dispatch(friends.actions.setErrors(null))
        })
      })
  }, [dispatch])

  const onSearchSubmit = (e) => {
    e.preventDefault()
    const filteredUsers = users.filter(user => user.username.includes(value))
    setFilteredUsers(filteredUsers)
  }

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

  const onUnfollowFriend = (item) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ id: item._id })
    }
    fetch(API_URL('unfollow'), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(user.actions.removeFriends(data.friend.id))
        //here we need to fix local storage as well
      })
  }

  return (
    <PageContainer>
      <p>Friends</p>
      <ul>
        {friendsList.map(item => <li style={{display:"flex", alignItems:"center"}}>
            <Avatar alt={item.username && item.username.toUpperCase()} src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`} />
            {item.username}
            <button onClick={() => onUnfollowFriend(item)}>Unfollow</button>
          </li>
        )}
      </ul>
      <p>Friend requests</p>
      <ul>
        {friendRequests.map(item =>
          <li>
            {item.username}
            <Avatar alt={item.username && item.username.toUpperCase()} src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`} />
            <button onClick={() => onRequestAccept(item)}>Accept</button>
          </li>)}
      </ul>
      <Form onSubmit={onSearchSubmit}>
        <SearchInput
          type="text"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="search your friends here"
        />
        <SearchButton
          type="submit"
        >
          <SearchIcon />
        </SearchButton>
      </Form>
      {filteredUsers.map(item => <FollowThumb item={item} key={item._id} />)}

    </PageContainer>
  )
}

export default FriendsPage