import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Button, ButtonsWrapper } from 'styled-components/Buttons'
import thoughts from 'reducers/thoughts'
import { THOUGHTS_URL } from 'reusables/urls'
import MessageWrapperComponent from './MessageWrapper'

const MessageList = ({ page, setPage, perPage, setPerPage }) => {
  const thoughtsList = useSelector(store => store.thoughts.thoughts)
  const dispatch = useDispatch()
  const [visble, setVisble] = useState(10)

  const loadMore = () => {
    setVisble(visble + 10)
    setPerPage(perPage + 10)
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
          <MessageWrapperComponent 
            item={item} 
            page={page} 
            setPage={setPage} 
            perPage={perPage} 
            setPerPage={setPerPage} />
            )}
          {visble < thoughtsList.length ?
            <ButtonsWrapper>
              <Button type="button" className="btn" onClick={loadMore}>More</Button>
            </ButtonsWrapper>
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
  margin: 2rem 0;
  border-radius: 8px 8px 3px 3px;
`

const NameAvatarWrapper = styled.div`
  background-color: #bca0bc;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 15px;
  color: #fff;
`

const Name = styled.p`
  margin: 0;
`

const MessageCreatedAtWrapper = styled.div`
  padding: 15px 0 0 15px;
`

const MessageText = styled.p`
  font-size: 16px;
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
  padding: 8px 10px;
`

const HugsText = styled.p`
  margin:0;
  padding: 5px;
  color: grey;
  font-size: 12px;
`

const DateText = styled.p`
  color: #4c5f6b;
  font-style: italic;
  color: grey;
  font-size: 12px;
  padding-right: 15px;
`