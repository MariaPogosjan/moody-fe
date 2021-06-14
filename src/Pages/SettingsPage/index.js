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

const Settings = () => {
  const fileInput = useRef()
  const userId = useSelector(store => store.user.userId)
  const accessToken = useSelector(store => store.user.accessToken)
  const userImage = useSelector(store => store.user.profileImage)
  const dispatch = useDispatch()
  const history = useHistory()

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
        dispatch(user.actions.setProfileImage(data.imageURL))
        if (data.sucess) {
          batch(() => {
            dispatch(user.actions.setProfileImage(data.profileImage))
            dispatch(user.actions.setErrors(null))
            localStorage.setItem('user', JSON.stringify({ profileImage: data.profileImage }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
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
      <UpdateUsername />
      <UpdatePassword />
    </FormSection>
  )
}

export default Settings