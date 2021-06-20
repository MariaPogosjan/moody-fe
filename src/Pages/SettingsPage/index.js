import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components'
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp'
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp'
import {
  FormSection,
  Form,
  Label,
  Input
}
  from 'styled-components/Forms'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'
import { PROFILE_IMAGE_URL } from 'reusables/urls'
import user from 'reducers/user'

import UpdateUsername from './UpdateUsername'
import UpdatePassword from './UpdatePassword'
import SignoutButton from './SignoutButton'


const Container = styled.section`
  padding-bottom: 70px;
`
const IconTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #4C5F6B;
`

const Wrapper = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const UploadImageTitle = styled.p`
  font-size: 14px;
  color: #4C5F6B;
  cursor: pointer;
  margin-right: 10px;
`

const Settings = () => {
  const fileInput = useRef()
  const userId = useSelector(store => store.user.userId)
  const accessToken = useSelector(store => store.user.accessToken)
  const [visible, setVisible] = useState(false)

  //const userImage = useSelector(store => store.user.profileImage)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
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
        if (data.success) {
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
    <Container>
      <SignoutButton />
      <FormSection>
        <Form onSubmit={onFormSubmit}>
          <IconTitleWrapper>
            <UploadImageTitle onClick={() => setVisible(!visible)} htmlFor="file-input">Upload image</UploadImageTitle>
            {visible ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}
          </IconTitleWrapper>
          <Wrapper visible={visible}>
            <Label htmlFor="username">Update username</Label>
            <Input type="file" ref={fileInput} id="file-input" />
            <ButtonsWrapper>
              <Button type="submit">Upload</Button>
            </ButtonsWrapper>
          </Wrapper>
        </Form>
        <UpdateUsername />
        <UpdatePassword />
      </FormSection>

    </Container>
  )
}

export default Settings