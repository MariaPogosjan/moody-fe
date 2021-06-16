import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import thoughts from 'reducers/thoughts'
import { API_URL, THOUGHT_HUG } from 'reusables/urls'

const MessageList = () => {
  const [comment, setComment] = useState("")
  const thoughtsList = useSelector(store => store.thoughts.thoughts)
  //const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()
  }

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

  const onHugSend = (id) => {
    console.log(id)
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(THOUGHT_HUG(id), options)
      .then(res => res.json())
      .then(() => fetchMessageList())
  }
  
  useEffect(() => {
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
  }, [dispatch])

  return (
    <div>
      {thoughtsList.map(item =>
        <div>
          <p>{item.message}</p>
          <p>{item.user}</p>
          <p>{item.hugs}</p>
          <button onClick={() => onHugSend(item._id)}>heart</button>
          <form onSubmit={onFormSubmit}>
            <label>
              <input
                id="newMessage"
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </label>
            <button type="submit">comment</button>
          </form>
          {item.comments.map(item => <p>{item}</p>)}
        </div>)}
    </div>
  )
}
export default MessageList