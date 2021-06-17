import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import formatDistance from 'date-fns/formatDistance'
import Avatar from '@material-ui/core/Avatar'

import thoughts from 'reducers/thoughts'
import { API_URL, THOUGHT_HUG, THOUGHT_COMMENT } from 'reusables/urls'

import Comment from './Comment'

const MessageListContainer = styled.section`
  padding: 5px;
`

const MessageWrapper = styled.div`
  border: 1px solid #bca0bc;
  margin: 20px 0;
  border-radius: 6px;
`
const HugButton = styled.button`
  background-color: #EEECFB;
  border-radius: 50%;
  border: none;
  padding: 2px 5px;
`
const NameAvatarWrapper = styled.div`
  background-color: #bca0bc;
  display: flex;
  align-items: center;
  padding: 5px;
  color: #fff;
`
const Name = styled.p`
  margin:0;
`
const HugsText = styled.p`
  margin:0;
  padding: 5px;
`
const MessageCreatedAtWrapper = styled.div`
  padding: 5px;
`
const HugsButtonWrapper = styled.div`
  display: flex;
  margin: 10px 5px;
`
const DateText = styled.p`
  color: #4c5f6b;
  font-style: italic;
`
const MessageText = styled.p`
`
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

const CommentsWrapper = styled.div`

`

const MessageList = () => {
  const [comment, setComment] = useState("")
  const thoughtsList = useSelector(store => store.thoughts.thoughts)
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
    <>
    {thoughtsList.length>0 &&
    <MessageListContainer>
      {thoughtsList.map(item =>
        <MessageWrapper key={item._id}>
          <NameAvatarWrapper>
          <Avatar
                alt={item.user && item.user.username.toUpperCase()}
                src={item.user.profileImage ? item.user.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
                style={{ marginRight: "5px" }}
              />
            <Name>{item.user.username}</Name>
          </NameAvatarWrapper>
          <MessageCreatedAtWrapper>
            <MessageText>{item.message}</MessageText>
            <DateText>{formatDistance(new Date(item.createdAt), Date.now())}</DateText>
          </MessageCreatedAtWrapper>
          <HugsButtonWrapper>
            <HugButton onClick={() => onHugSend(item._id)}>💞</HugButton>
            <HugsText> x {item.hugs}</HugsText>
          </HugsButtonWrapper>
          <p>💬 x {item.comments.length}</p>
          <Comment item ={item}/>
          {/* <CommentForm onSubmit={(e)=>onComment(e, item._id)}>
            <InputLabel> Leave a comment </InputLabel>
            <CommentInput
                id="newMessage"
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Leave a comment"
              />
            <CommentButton type="submit">comment</CommentButton>
          </CommentForm> */}
          <CommentsWrapper>
            {item.comments.map(comment => 
              <div>
                <p>{comment.comment}</p>
                <p>{comment.user.username}</p>
                <p>{formatDistance(new Date(comment.createdAt), Date.now())}</p>
              </div>
              )}
          </CommentsWrapper>
          
        </MessageWrapper>)}
    </MessageListContainer>
    }
    </>
  )
}
export default MessageList