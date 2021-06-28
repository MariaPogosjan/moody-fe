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
            key={item._id}
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
            <p>No more thoughts to load...</p>
          }
        </MessageListContainer>
      }
    </>
  )
}
export default MessageList

const MessageListContainer = styled.section`
`
