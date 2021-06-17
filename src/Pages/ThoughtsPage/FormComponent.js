import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { API_URL } from 'reusables/urls'
import thoughts from 'reducers/thoughts'


const MessageFormContainer = styled.section`
  padding: 5px;
  background-color: #bca0bc;
  color: #fff;
`
const Form = styled.form `
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MessageInput = styled.input`
  border-radius: 6px;
  border: 1px #EEECFB solid;
  width: 300px;
  height: 50px;
  padding: 5px;
  color: #4c5f6b;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 10px;
`
const Label = styled.label`
  margin-bottom: 10px;
`
const ShareButton = styled.button`
  border-radius: 6px;
  border: 1px #EEECFB solid;
  background-color: #EEECFB;
  padding: 5px;
  color: #4c5f6b;
  font-family: 'Montserrat', sans-serif;
  width: 150px;
`

const FormComponent = () => {
  const [message, setMessage] = useState('')
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const fetchMessageList = () => {
    fetch(API_URL('thoughts'))
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
    fetch(API_URL('thoughts'), options)
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
          💗 Share 💗
        </ShareButton>
      </Form>
    </MessageFormContainer>
  )
}
export default FormComponent