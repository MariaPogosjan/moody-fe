import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { THOUGHTS_URL } from 'reusables/urls'
import thoughts from 'reducers/thoughts'


const FormComponent = ({ page, setPage, perPage, setPerPage }) => {
  const [message, setMessage] = useState('')
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const fetchMessageList = () => {
    fetch(THOUGHTS_URL(page, perPage))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(thoughts.actions.setThoughts(data.thoughts))
        } else {
          dispatch(thoughts.actions.setErrors(data))
        }
      })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ message })
    }
    fetch(THOUGHTS_URL(1, 20), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        fetchMessageList()
      })
    setMessage('')
  }


  return (
    <MessageFormContainer>
      <Form onSubmit={onFormSubmit}>
        <Label> Share your thoughts and feelings!</Label>
          <MessageInput
            id="newMessage"
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        <ShareButton
          type="submit"
        >
          Share 
        </ShareButton>
      </Form>
    </MessageFormContainer>
  )
}
export default FormComponent

const MessageFormContainer = styled.section`
  padding: 1.5rem 0.5px;
  background-color: #EEECFB;
  color: #fff;
`

const Form = styled.form `
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`
const MessageInput = styled.input`
  border: none;
  width: 90%;
  height: 6rem;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 1rem;
`
const Label = styled.label`
  margin-bottom: 2rem;
  color: #404167; 
`

const ShareButton = styled.button`
  background-color: #BCA0BC;
  border: none;
  color: white;
  padding: 1rem 0.8rem;
  margin-top: 1.2rem; 
  border-radius: 6px;
  width: 8rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  
   &:hover {
     opacity: 0.8;
   }
`
