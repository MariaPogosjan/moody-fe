import React from 'react'
import styled from 'styled-components'
import formatDistance from 'date-fns/formatDistance'
import Comment from './CommentForm'

const CommentsList = ({ item, open }) => {
  const reversedComments = [...item.comments].reverse()

  return (
    <CommentsWrapper visible={open}>
      <Comment item={item} />
      {reversedComments.map(comment =>
        <CommentTextWrapper key={comment._id}>
          <Username>{comment.user.username}</Username>
          <CommentText>{comment.comment}</CommentText>
          <DateText>{formatDistance(new Date(comment.createdAt), Date.now())}</DateText>
        </CommentTextWrapper>
      )}
    </CommentsWrapper>
)

}
export default CommentsList

const CommentsWrapper = styled.div`
  display:${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
  padding: 12px;
`
 const CommentTextWrapper = styled.div`
  background-color: #EEECFB;
  border-radius: 6px;
  margin: 5px;
  font-size: 12px;
` 
const Username = styled.p`
  margin: 0;
  padding: 3px 2px 3px 5px;
  color: grey;
`
const CommentText = styled.p`
  margin: 0;
  padding: 8px 2px 3px 5px;
`

const DateText = styled.p`
  text-align: right;
  font-style: italic;
  color: grey;
  font-size: 10px;
  padding-right: 15px;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`