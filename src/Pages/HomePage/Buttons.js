import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

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


const ButtonsWrapper = styled.div`
  display: flex; 
  justify-content: flex-start;
`

const Button = styled.button`
  background-color: #404167;
  border: none;
  color: white;
  padding: 0.6rem;
  margin: 0.9rem  0.5rem  0.5rem 0; 
  border-radius: 6px;
  width: 7rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
   &:hover {
     opacity: 0.8;
   }

  @media (min-width: 768px) {
    padding: 0.8rem;
    width: 8rem;
    font-size: 0.9rem;
}
`
