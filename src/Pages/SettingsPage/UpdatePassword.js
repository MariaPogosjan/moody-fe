import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp'
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp'

import user from 'reducers/user'
import { PASSWORD_UPDATE_URL } from 'reusables/urls'
import { ButtonsWrapper } from 'styled-components/Buttons'
import {
  FormSection,
  Form
}
  from 'styled-components/Forms'


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
      <IconTitleWrapper onClick={() => setVisible(!visible)}> 
        <SettingsTitle>Update password</SettingsTitle>
        {visible ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}
        </IconTitleWrapper> 
        <Wrapper visible={visible}>
        <SettingsLabel htmlFor="settings-password">Old password</SettingsLabel>
        <Input
          id="settings-password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <SettingsLabel htmlFor="newPassword">New password</SettingsLabel>
        <Input
          id="newPassword"
          type="password"
          required
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <SettingsLabel htmlFor="confirmedPassword">Confirm new password</SettingsLabel>
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


const IconTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EEECFB;
  border: 1px solid #EEECFB;
  padding: 0rem;
  margin-top: 1rem;

    @media (min-width: 768px) {
      margin-top: 1rem;
      padding: 0.3rem 0.8rem;
      width: 80%;  
    }
`

const Wrapper = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 320px;
  border: 1px solid #EEECFB;
  border-top: none;

  @media (min-width: 768px) {
      padding: 0.3rem 0.8rem;
      width: 80%;  
      height: 380px;
    }
`

const SettingsTitle = styled.p`
  color: #4C5F6B;
  cursor: pointer;
  padding-left: 1rem;
  font-size: 12px;

  @media (min-width: 768px) {
      font-size: 18px;
      
    }
`

const SettingsLabel = styled.label `
  font-size: 10px;
  margin-top: 10px;
`

const Input = styled.input`
  padding: 0.6rem;
  margin: 1rem 0 0.5rem 0;
  width: 80%;
  border: 1px solid #BCA0BC;
  border-radius: 6px;

  @media (min-width: 768px) {
    width: 60%;
    margin: 1rem 0 0.5rem 0;
    width: 80%;
    padding: 0.9rem;
  }
` 

const Button = styled.button`
  width: 100px;
  padding: 0.5rem;
  border: none;
  background-color: #404167;
  border-radius: 6px;
  color: #fff;
  margin-top: 1.2rem; 
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  cursor: pointer;
  

  @media (min-width: 768px) {
    padding: 1rem 0.8rem;
    margin-top: 1.2rem; 
    border-radius: 6px;
    width: 15rem;
    font-size: 1rem;

    &:hover {
      opacity: 0.8;
    }
  }
`