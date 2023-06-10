import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import {
  FormSection,
  Form,
  Label,
  Input,
  ErrorMessage
} from 'styled-components/Forms'
import { Button, ButtonsWrapper } from 'styled-components/Buttons'
import user from 'reducers/user'
import { API_URL } from 'reusables/urls'

const Login = () => {
  const [emailOrUsername, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/profile')
    }
  }, [accessToken, history])

  const onUsernameOrEmailChange = (event) => {
    setUsernameOrEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailOrUsername, password })
    }
    fetch(API_URL('sessions'), options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setProfileImage(data.profileImage))
            dispatch(user.actions.setFriends(data.friends))
            dispatch(user.actions.setFriendRequests(data.friendRequests))
            dispatch(user.actions.setMyFriendRequests(data.myFriendRequests))
            dispatch(user.actions.setErrors(null))
            localStorage.setItem('user', JSON.stringify({
              userId: data.userId,
              username: data.username,
              accessToken: data.accessToken,
              profileImage: data.profileImage
            }))
            localStorage.setItem('friends', JSON.stringify({
              friends: data.friends,
            }))
            localStorage.setItem('friendRequests', JSON.stringify({
              friendRequests: data.friendRequests,
            }))
            localStorage.setItem('myFriendRequests', JSON.stringify({
              myFriendRequests: data.myFriendRequests,
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
          setUsernameOrEmail("")
          setPassword("")
        }
      })
  }

  return (
    <FormSection >
      <SectionTitle>Sign in</SectionTitle>
      <Form onSubmit={onFormSubmit}>
        {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
        <Label htmlFor="name">Email or username</Label>
        <Input
          type="text"
          required
          onChange={onUsernameOrEmailChange}
          value={emailOrUsername}
          placeholder="Email or username"
          id="name"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          required
          onChange={onPasswordChange}
          value={password}
          placeholder="Password"
          id="password"
        />
        <ButtonsWrapper>
          <Button type="submit">Sign in</Button>
        </ButtonsWrapper>
      </Form>
    </FormSection>
  )
}
export default Login

const SectionTitle = styled.h1`
  color: #404167;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
     font-size: 2.1rem;
  }
` 