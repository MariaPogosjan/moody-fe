import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { 
  FormSection,
  Form,
  Label,
  Input
} from 'styled-components/Forms'
import { Button, ButtonsWrapper } from 'styled-components/Buttons'
import { SectionTitle } from 'styled-components/Titels'
import user from 'reducers/user'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

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
    event.preventDefault()

  }

  return (
    <FormSection>
      <SectionTitle>Sign up</SectionTitle>
      <Form>
        <Label htmlFor="name">Name</Label>
        <Input placeholder="Username" id="name"/>
        <Label htmlFor="email">E-post</Label>
        <Input placeholder="Email" id="email"/>
        <Label htmlFor="password">Password</Label>
        <Input placeholder="Password" id="password"/> 
      </Form>
      <ButtonsWrapper>
        <Button>Sign up</Button>
      </ButtonsWrapper>

    </FormSection>

  )
}

export default SignUp