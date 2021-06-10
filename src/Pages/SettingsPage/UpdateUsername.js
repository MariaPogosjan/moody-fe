import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'

import user from 'reducers/user'
import { USERNAME_UPDATE_URL } from 'reusables/urls'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'
import {
  FormSection,
  Form,
  VisibleLabel,
  Input
}
  from 'styled-components/Forms'


const UpdateUsername = () => {
  const [username, setUsername] = useState('')

  const userId = useSelector(store => store.user.userId)
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onUsernameUpdate = (e) => {
    e.preventDefault()

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ username })
    }

    fetch(USERNAME_UPDATE_URL(userId), options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          batch(()=> {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setErrors(null))
  
            localStorage.setItem('user', JSON.stringify({ username: data.username }))
          })
          
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }
  return (
    <FormSection>
      <Form onSubmit={onUsernameUpdate}>
        <VisibleLabel htmlFor="username">Update username</VisibleLabel>
        <Input
          id="username"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <ButtonsWrapper>
          <Button type="submit">
            update
          </Button>
        </ButtonsWrapper>
      </Form>
    </FormSection>
  )
}

export default UpdateUsername