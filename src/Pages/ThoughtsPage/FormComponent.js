import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { THOUGHTS_URL } from 'reusables/urls'
import thoughts from 'reducers/thoughts'
import { Label } from 'styled-components/Forms'


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
            rows="5"
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
  padding: 1rem 1rem 1rem 1rem;
  background-color: #bca0bc;
  border-radius: 6px;

  @media (min-width: 768px) {
    padding: 1.8rem 1.8rem 1.4rem 1.8rem;
  }
`
const Form = styled.form `
  display: flex;
  flex-direction: column;
 
`
const MessageInput = styled.textarea`
  border: none;
  width: 100%;
  color: #4c5f6b;
  font-family: 'Montserrat', sans-serif;
  outline-style: inherit;
  resize: none;
`

const ShareButton = styled.button`
  border-radius: 6px;
  border: none;
  background-color: #EEECFB;
  padding: 8px;
  margin-top: 13px;
  color: #4c5f6b;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  width: 80px;

  @media (min-width: 768px) {
    width: 150px;
    font-size: 15px;
  }
`
