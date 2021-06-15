import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search'
import { useSelector, useDispatch, batch } from 'react-redux'

import { API_URL } from 'reusables/urls'
import friends from 'reducers/friends'


import FollowThumb from './FollowThumb'


const FormContainer = styled.section`
  padding: 5px;
`
const Form = styled.form`
  padding:5px;
  display: flex;
  align-items: center;
`
const SearchInput = styled.input`
  padding: 10px;
  border: 1.5px solid #bca0bc;
  font-size: 12px;
  width: 200px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`
const SearchButton = styled.button`
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: none;
  padding: 5px 6px;
  background-color: #bca0bc;
  color: #fff;
`
const SearchTitle = styled.h2`
  color: #4C5F6B;
  font-size: 18px;
  
`
const ListContainer = styled.ul`
  padding:0;
`

const SearchForm = () => {
  const [value, setValue] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const users = useSelector(store => store.friends.friends)
  const dispatch = useDispatch()

  const onSearchSubmit = (e) => {
    e.preventDefault()
    const filteredUsers = users.filter(user => user.username.includes(value))
    setFilteredUsers(filteredUsers)
  }


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

  return (
    <FormContainer>
      <SearchTitle>Find friends</SearchTitle>
      <Form onSubmit={onSearchSubmit}>
        <SearchInput
          type="text"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="search your friends here"
        />
        <SearchButton type="submit">
          <SearchIcon />
        </SearchButton>
      </Form>
      <ListContainer>
        {filteredUsers.map(item => <FollowThumb item={item} key={item._id} />)}
      </ListContainer>

    </FormContainer>
  )
}
export default SearchForm