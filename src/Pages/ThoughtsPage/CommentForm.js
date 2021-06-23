import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { THOUGHTS_URL, THOUGHT_COMMENT } from 'reusables/urls'
import thoughts from 'reducers/thoughts'

const Comment = ({ item, page, perPage }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const accessToken = useSelector(store => store.user.accessToken)

  const fetchMessageList = () => {
    fetch(THOUGHTS_URL(page, perPage))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(thoughts.actions.setThoughts(data.thoughts))
        } else {
          dispatch(thoughts.actions.setErrors(data))
        }
      })
  }
  
  const onComment = (e, id) => {
    e.preventDefault()
    console.log(id)
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ comment })
    }
    fetch(THOUGHT_COMMENT(id), options)
      .then(res => res.json())
      .then((data) => fetchMessageList())
    setComment('')
  }
  return (
    <CommentForm onSubmit={(e) => onComment(e, item._id)}>
      <InputLabel> Leave a comment </InputLabel>
      <CommentInput
        id="newMessage"
        type="text"
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Leave a comment"
      />
      <CommentButton type="submit">comment</CommentButton>
    </CommentForm>
  )
}
export default Comment


const CommentForm = styled.form`
  margin: 5px 0;
  padding: 5px;

  @media (min-width: 768px) {
    margin: 10px 0;
  }
`

const CommentInput = styled.input`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px #EEECFB solid;
  padding: 8px;
  color: #4c5f6b;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`
const CommentButton = styled.button`
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px #EEECFB solid;
  background-color: #EEECFB;
  padding: 8px;
  color: #4c5f6b;
  font-size: 10px;
  font-family: 'Montserrat', sans-serif;
  @media (min-width: 768px) {
    font-size: 12px;
  }
`
const InputLabel = styled.label`
  display: none;
`
