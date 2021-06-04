import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  FormSection,
  Form,
  Label,
  Input,
  ErrorMessage
} from 'styled-components/Forms'
import { Button, ButtonsWrapper } from 'styled-components/Buttons'
import { SectionTitle } from 'styled-components/Titels'
import user from 'reducers/user'
import { API_URL } from 'reusables/urls'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
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

  const onNameChange = (event) => {
    setUsername(event.target.value)
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event) => {
    console.log("form submit")
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }
    fetch(API_URL('users'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              userId: data.userId,
              username: data.username,
              accessToken: data.accessToken
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

  return (
    <FormSection >
      <SectionTitle>Sign up</SectionTitle>
      <Form onSubmit={onFormSubmit}>
        {errors &&
          <>
            {errors.error.code === 11000
              ?
              <ErrorMessage>Email or username is not unique</ErrorMessage>
              :
              <ErrorMessage>{errors.message}</ErrorMessage>
            }
          </>
        }
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          required
          onChange={onNameChange}
          value={username}
          placeholder="Username"
          id="name"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          required
          onChange={onEmailChange}
          value={email}
          placeholder="Email"
          id="email"
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
          <Button type="submit">Sign up</Button>
        </ButtonsWrapper>
      </Form>
    </FormSection>

  )
}

export default SignUp