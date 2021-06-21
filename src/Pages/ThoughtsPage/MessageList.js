import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import formatDistance from 'date-fns/formatDistance'
import Avatar from '@material-ui/core/Avatar'

import thoughts from 'reducers/thoughts'
import { THOUGHTS_URL, THOUGHT_HUG } from 'reusables/urls'

import Comment from './CommentForm'
import CommentsList from './CommentsList'

const MessageList = ({ page, setPage, perPage, setPerPage }) => {
  const thoughtsList = useSelector(store => store.thoughts.thoughts)
  const dispatch = useDispatch()
  const [visble, setVisble] = useState(10)

  const loadMore = () => {
    setVisble(visble + 10)
    setPerPage(perPage + 10)
  }

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
  }, [dispatch, page, perPage])

  return (
    <>
      {thoughtsList.length > 0 &&
        <MessageListContainer>
          {thoughtsList.slice(0, visble).map(item =>
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
              <HugsCommentsWrapper>
                <HugsButtonWrapper>
                  <HugButton onClick={() => onHugSend(item._id)}>💗 </HugButton>
                  <HugsText> x {item.hugs}</HugsText>
                  </HugsButtonWrapper>
                <HugsText>💬 x {item.comments.length}</HugsText>
              </HugsCommentsWrapper>
{/*               <Comment item={item} />
 */}              <CommentsList item={item}/>
              {/* <CommentsWrapper>
                {item.comments.map(comment =>
                  <div key={comment._id}>
                    <p>{comment.comment}</p>
                    <p>{comment.user.username}</p>
                    <p>{formatDistance(new Date(comment.createdAt), Date.now())}</p>
                  </div>
                )}
              </CommentsWrapper> */}

            </MessageWrapper>)}
          {visble < thoughtsList.length ?
            <div className="btn-container">
              <button type="button" className="btn" onClick={loadMore}>More</button>
            </div>
            :
            <p>No more thought to load...</p>
          }
        </MessageListContainer>
      }
    </>
  )
}
export default MessageList


const MessageListContainer = styled.section`
  
`

const MessageWrapper = styled.div`
  border: 1px solid #bca0bc;
  border-top: none;
  margin: 2rem 0;
`

const NameAvatarWrapper = styled.div`
  background-color: #bca0bc;
  display: flex;
  align-items: center;
  padding: 8px;
  color: #fff;
`

const Name = styled.p`
  margin: 0;
`

const MessageCreatedAtWrapper = styled.div`
  padding: 8px;
`

const MessageText = styled.p`
  width: 80%;
  color: #404167;
`

const DateText = styled.p`
  color: grey;
  font-style: italic;
  font-size: 12px;
`

const HugsCommentsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;
`

const HugsButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`

const HugButton = styled.button`
  background-color: #EEECFB;
  border-radius: 50%;
  border: none;
  padding: 3px 8px;
  text-align: center;
`

const HugsText = styled.p`
  margin:0;
  padding: 5px;
  color: grey;
  font-style: italic;
  font-size: 12px;
`
