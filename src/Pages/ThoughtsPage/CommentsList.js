import React, { useState } from 'react'
import styled from 'styled-components'
import formatDistance from 'date-fns/formatDistance'
import Comment from './CommentForm'

const CommentsContainer = styled.section`

`
const CommentsTitle = styled.p`
  color: #4c5f6b;
  font-size: 14px;
  margin: 5px;
  text-decoration: underline;
`
const CommentsWrapper = styled.div`
  display:${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
`
const Comment1 = styled.div`
  background-color: #EEECFB;
  border-radius: 6px;
  margin: 5px;
  padding: 3px;
  font-size: 12px;
`
const Username = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`
const CommentText = styled.p`
  margin: 0;
  padding: 3px 2px 3px 5px;
`
const DateText = styled.p`
  margin: 0;
  text-align: right;
  font-style: italic;
`


const CommentsList = ({ item }) => {
  const [visible, setVisible] = useState(false)
  return (
    <CommentsContainer>
      <CommentsTitle onClick={() => setVisible(!visible)}>Add & show comments</CommentsTitle>
      <CommentsWrapper visible={visible}>
      <Comment item={item} />

        {item.comments.map(comment =>
          <Comment1 key={comment._id}>
            <Username>{comment.user.username}</Username>
            <CommentText>{comment.comment}</CommentText>
            <DateText>{formatDistance(new Date(comment.createdAt), Date.now())}</DateText>
          </Comment1>
        )}
      </CommentsWrapper>
    </CommentsContainer>
  )

}
export default CommentsList