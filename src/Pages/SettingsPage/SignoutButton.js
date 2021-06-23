import React from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components'
import user from 'reducers/user'
import feeling from 'reducers/feeling'

import { Button } from 'styled-components/Buttons'

const SignoutButton = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onSignOutClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setErrors(null))
      dispatch(user.actions.setFriends([]))
      dispatch(user.actions.setFriendRequests([]))
      dispatch(user.actions.setMyFriendRequests([]))
      dispatch(user.actions.setProfileImage(null))
      dispatch(feeling.actions.setFeelings([]))
    })

    localStorage.removeItem('user')
    localStorage.removeItem('friends')
    localStorage.removeItem('myFriendsRequests')
    localStorage.removeItem('friendsRequests')
  }

  return (
    <>
      {accessToken &&
        <ButtonsWrapper>
          <Button onClick={onSignOutClick}>Sign out</Button>
        </ButtonsWrapper>
      }
    </>
  )
}

export default SignoutButton


const ButtonsWrapper = styled.div`
  display: flex; 
  justify-content: center;
  padding-bottom: 70px;

  @media (min-width: 768px) {
  
    margin-top: 5rem; 
   
  }
`