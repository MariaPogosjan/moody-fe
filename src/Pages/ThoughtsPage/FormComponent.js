import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL } from 'reusables/urls'
import thoughts from 'reducers/thoughts'

const FormComponent = () => {
  const [message, setMessage] = useState('')
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const fetchMessageList = () => {
    fetch(API_URL('thoughts'))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.success){
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
  <form  onSubmit={onFormSubmit}>
  <p>What's making you happy right now?</p>
  <label>
    <input
      id="newMessage" 
      type="text"
      value={message}
      onChange={ e => setMessage(e.target.value)} 
    />
  </label>
  <button 
    type="submit"
  >
    Send
  </button> 
</form>
 )
}
export default FormComponent