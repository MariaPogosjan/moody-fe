import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Button } from 'styled-components/Buttons'

const ButtonsWrapper = styled.div`
  display: flex; 
  justify-content: center;
`

const Buttons = () => {
  const history = useHistory()

  const onSignUpClick = () => {
    history.push('/signup')
  }

  const onSignInClick = () => {
    history.push('/signin')
  }

  return (
    <ButtonsWrapper>
      <Button onClick={onSignInClick}>Sign in</Button>
      <Button onClick={onSignUpClick}>Sign up</Button>
    </ButtonsWrapper>
  )
}

export default Buttons