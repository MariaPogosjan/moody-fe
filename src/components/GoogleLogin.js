import React from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, batch } from 'react-redux'
import user from 'reducers/user'
import styled from 'styled-components'

import { API_URL } from 'reusables/urls'

const GoogleLoginComponent = ({ text }) => {
  const dispatch = useDispatch()

  const responseSuccessGoogle = async (response) => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokenId: response.tokenId
      })
    }
    await fetch(API_URL("googlelogin"), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setProfileImage(data.profileImage))
            dispatch(user.actions.setFriends(data.friends))
            dispatch(user.actions.setFriendRequests(data.friendRequests))
            dispatch(user.actions.setMyFriendRequests(data.myFriendRequests))
            dispatch(user.actions.setErrors(null))
            localStorage.setItem('user', JSON.stringify({
              userId: data.userId,
              username: data.username,
              accessToken: data.accessToken,
              profileImage: data.profileImage
            }))
            localStorage.setItem('friends', JSON.stringify({
              friends: data.friends,
            }))
            localStorage.setItem('friendRequests', JSON.stringify({
              friendRequests: data.friendRequests,
            }))
            localStorage.setItem('myFriendRequests', JSON.stringify({
              myFriendRequests: data.myFriendRequests,
            }))
          })
        }
      })
  }
  
  const responseErrorGoogle = (response) => {
    alert("Login with Google did not succeed")
  }

  return (
    <GoogleButtonWrapper>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_LOGIN}.apps.googleusercontent.com`}
        buttonText={`${text} with Google`}
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
        tabe="button"
      />
    </GoogleButtonWrapper>
  )
}
export default GoogleLoginComponent


const GoogleButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`
