<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useRef } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { 
    FormSection, 
    Form, 
    VisibleLabel, 
    Input } 
from 'styled-components/Forms'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'
import { PROFILE_IMAGE_URL } from 'reusables/urls'
import user from 'reducers/user'
=======
=======
>>>>>>> 051d40abb56dc82fe9c5495e311e738ef1b0e116
import React, { useRef, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'
import {
  FormSection,
  Form,
  VisibleLabel,
  Input
}
  from 'styled-components/Forms'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'
import { PROFILE_IMAGE_URL } from 'reusables/urls'
import user from 'reducers/user'

import UpdateUsername from './UpdateUsername'
import UpdatePassword from './UpdatePassword'
<<<<<<< HEAD
>>>>>>> 703464f99b209003b3f71d07533867f69a348d20
=======
>>>>>>> 051d40abb56dc82fe9c5495e311e738ef1b0e116

const Settings = () => {
  const fileInput = useRef()
  const userId = useSelector(store => store.user.userId)
<<<<<<< HEAD
<<<<<<< HEAD
  const userImage = useSelector(store => store.user.profileImage)
  const dispatch = useDispatch()
=======
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()
>>>>>>> 703464f99b209003b3f71d07533867f69a348d20
=======
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()
>>>>>>> 051d40abb56dc82fe9c5495e311e738ef1b0e116
  
  useEffect(() => {
    if(!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', fileInput.current.files[0])
    const options = {
      method: 'POST',
      body: formData
    }
    fetch(PROFILE_IMAGE_URL(userId), options)
      .then(res => res.json())
      .then(data => {
<<<<<<< HEAD
<<<<<<< HEAD
        dispatch(user.actions.setProfileImage(data.imageURL))
=======
=======
>>>>>>> 051d40abb56dc82fe9c5495e311e738ef1b0e116
        if (data.sucess) {
          batch(() => {
            dispatch(user.actions.setProfileImage(data.profileImage))
            dispatch(user.actions.setErrors(null))
            localStorage.setItem('user', JSON.stringify({ profileImage: data.profileImage }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
<<<<<<< HEAD
>>>>>>> 703464f99b209003b3f71d07533867f69a348d20
=======
>>>>>>> 051d40abb56dc82fe9c5495e311e738ef1b0e116
      })
  }

  return (
    <FormSection>
      <Form onSubmit={onFormSubmit}>
        <VisibleLabel htmlFor="file-input">Upload image</VisibleLabel>
        <Input type="file" ref={fileInput} id="file-input" />
        <ButtonsWrapper>
          <Button type="submit">Upload</Button>
        </ButtonsWrapper>
      </Form>
<<<<<<< HEAD
<<<<<<< HEAD
      <img src={userImage}/>
=======
      <UpdateUsername />
      <UpdatePassword />
>>>>>>> 703464f99b209003b3f71d07533867f69a348d20
=======
      <UpdateUsername />
      <UpdatePassword />
>>>>>>> 051d40abb56dc82fe9c5495e311e738ef1b0e116
    </FormSection>
  )
}

export default Settings