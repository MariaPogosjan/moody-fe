import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp'
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp'

import user from 'reducers/user'
import { PASSWORD_UPDATE_URL } from 'reusables/urls'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'
import {
  FormSection,
  Form,
  VisibleLabel,
  Input
}
  from 'styled-components/Forms'

const Wrapper = styled.div`
  display: ${props => (props.visible? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-right: 10px;
`

const PasswordTitle = styled.p`
  font-size: 14px;
  color: #4C5F6B;
  cursor: pointer;
  margin-right: 10px;
`

const IconTitleWrapper =styled.div`
  color: #4C5F6B;
  display: flex;
  align-items: center;
`

const UpdatePassword = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const userId = useSelector(store => store.user.userId)
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onPasswordUpdate = (e) => {
    e.preventDefault()

    if(newPassword === confirmedPassword) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ password, newPassword })
    }

    fetch(PASSWORD_UPDATE_URL(userId), options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          dispatch(user.actions.setErrors(null))
          alert('Password is updated')
        } else {
          dispatch(user.actions.setErrors(data))
        } 
      })
    } else {
      alert('nooooooo, do it again')
    }
  }
  
  return (
    <FormSection>
      <Form onSubmit={onPasswordUpdate}>
      <IconTitleWrapper> 
        <PasswordTitle onClick={() => setVisible(!visible)}>Update password</PasswordTitle>
        {visible ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}
        </IconTitleWrapper> 
        <Wrapper visible={visible}>
        <VisibleLabel htmlFor="settings-password">Old password</VisibleLabel>
        <Input
          id="settings-password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <VisibleLabel htmlFor="newPassword">New password</VisibleLabel>
        <Input
          id="newPassword"
          type="password"
          required
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <VisibleLabel htmlFor="confirmedPassword">Confirm new password</VisibleLabel>
        <Input
          id="confirmedPassword"
          type="password"
          required
          onChange={(e) => setConfirmedPassword(e.target.value)}
          value={confirmedPassword}
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

export default UpdatePassword