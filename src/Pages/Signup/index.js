import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
    <p>hej</p>
  )
}

export default SignUp