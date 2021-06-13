import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'

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

  return (
    <PageContainer>
      <p>Friends</p>
      <ul>
        {friendsList.map(item => <li>{item}</li>)}
      </ul>
      <p>Friend requests</p>
      <ul>
        {friendRequests.map(item => <li>{item}</li>)}
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