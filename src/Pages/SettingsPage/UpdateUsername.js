import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components'
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp'
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp'

import user from 'reducers/user'
import { USERNAME_UPDATE_URL } from 'reusables/urls'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'
import {
  FormSection,
  Form,
  Label,
  Input
}
  from 'styled-components/Forms'

const Wrapper = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-right: 10px;
`

const UsernameTitle = styled.p`
  font-size: 14px;
  color: #4C5F6B;
  cursor: pointer;
  margin-right: 10px;
`

const IconTitleWrapper = styled.div`
  display: flex;
  color: #4C5F6B;
  align-items: center;
`

const UpdateUsername = () => {
  const [username, setUsername] = useState('')
  const [visible, setVisible] = useState(false)


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
        if (data.success) {
          batch(() => {
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
        <IconTitleWrapper>
          <UsernameTitle onClick={() => setVisible(!visible)}>
            Update username
          </UsernameTitle>
          {visible ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}
        </IconTitleWrapper>
        <Wrapper visible={visible}>
          <Label htmlFor="username">Update username</Label>
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
        </Wrapper>
      </Form>
    </FormSection>
  )
}

export default UpdateUsername