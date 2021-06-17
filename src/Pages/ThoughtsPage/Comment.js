import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { THOUGHTS_URL, THOUGHT_COMMENT } from 'reusables/urls'
import thoughts from 'reducers/thoughts'

const CommentForm = styled.form`
  margin-bottom: 10px;
  padding: 5px;
`

const CommentInput = styled.input`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px #EEECFB solid;
  padding: 5px;
  color: #4c5f6b;
  font-family: 'Montserrat', sans-serif;
`
const CommentButton = styled.button`
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px #EEECFB solid;
  background-color: #EEECFB;
  padding: 5px;
  color: #4c5f6b;
  font-family: 'Montserrat', sans-serif;
`
const InputLabel = styled.label`
  display: none;
`



const Comment = ({ item, page, setPage, perPage, setPerPage }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const accessToken = useSelector(store => store.user.accessToken)

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