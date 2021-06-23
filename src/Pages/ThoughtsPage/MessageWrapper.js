import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import formatDistance from 'date-fns/formatDistance'

import CommentsList from './CommentsList'
import thoughts from 'reducers/thoughts'
import { THOUGHTS_URL, THOUGHT_HUG } from 'reusables/urls'

const MessageWrapperComponent = ({ page, perPage, item }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

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

  const onHugSend = (id) => {
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
        if (data.success) {
          dispatch(thoughts.actions.setThoughts(data.thoughts))
        } else {
          dispatch(thoughts.actions.setErrors(data))
        }
      })
  }, [dispatch, page, perPage])

  return (
      <MessageWrapper key={item._id}>
      <NameAvatarWrapper>
       {item.user && <Avatar
          alt={item.user && item.user.username.toUpperCase()}
          src={item.user.profileImage ? item.user.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
          style={{ marginRight: "5px" }}
        />} 
      {item.user ? <Name>{item.user.username}</Name> : <Name>Guest</Name>}
      </NameAvatarWrapper>
      <MessageCreatedAtWrapper>
        <MessageText>{item.message}</MessageText>
      </MessageCreatedAtWrapper>
      <HugsCommentsWrapper>
        <HugsButtonWrapper>
          <HugButton onClick={() => onHugSend(item._id)}>💗</HugButton>
          <HugsText> x {item.hugs}</HugsText>
          <HugButton onClick={() => setOpen(!open)}>💬 </HugButton>
          <HugsText> x {item.comments.length}</HugsText>
        </HugsButtonWrapper>
        <DateText>{formatDistance(new Date(item.createdAt), Date.now())}</DateText>
      </HugsCommentsWrapper>
      <CommentsList item={item} open={open} setOpen={setOpen}/>
    </MessageWrapper>
  )
}

export default MessageWrapperComponent

const MessageWrapper = styled.div`
  border: 1px solid #bca0bc;
  margin: 2rem 0;
  border-radius: 6px;
`

const NameAvatarWrapper = styled.div`
  background-color: #bca0bc;
  border-radius: 6px 6px 0px 0px;
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 15px;
  color: #fff;
  font-size: 12px;

  @media (min-width: 768px) {
    font-size: 16px;
  }

`

const Name = styled.p`
  margin: 0;
`

const MessageCreatedAtWrapper = styled.div`
  padding: 15px 0 0 15px;
`

const MessageText = styled.p`
  font-size: 12px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`

const HugsCommentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
`

const HugsButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 50px;
`

const HugButton = styled.button`
  background-color: #EEECFB;
  border-radius: 50%;
  border: none;
  padding: 4px 6px;

  @media (min-width: 768px) {
    padding: 8px 10px;
  }
`

const HugsText = styled.p`
  margin:0;
  padding: 5px;
  color: grey;
  font-size: 10px;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`

const DateText = styled.p`
  color: #4c5f6b;
  font-style: italic;
  color: grey;
  font-size: 10px;
  padding-right: 30px;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`