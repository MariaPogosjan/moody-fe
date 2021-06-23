import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components'
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp'
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp'
import {
  FormSection,
  Form,
  Label
}
  from 'styled-components/Forms'
import { SectionTitle } from 'styled-components/Titels'
import { ButtonsWrapper } from 'styled-components/Buttons'
import { PROFILE_IMAGE_URL } from 'reusables/urls'
import user from 'reducers/user'

import UpdateUsername from './UpdateUsername'
import UpdatePassword from './UpdatePassword'
import SignoutButton from './SignoutButton'

const Settings = () => {
  const fileInput = useRef()
  const userId = useSelector(store => store.user.userId)
  const accessToken = useSelector(store => store.user.accessToken)
  const [visible, setVisible] = useState(false)
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
      <SectionTitle>Profile settings </SectionTitle>
      <FormSection>
        <Form onSubmit={onFormSubmit}>
         <>
          <IconTitleWrapper onClick={() => setVisible(!visible)}>
            <SettingsTitle htmlFor="file-input">Upload image</SettingsTitle>
            {visible ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}
          </IconTitleWrapper>
          </>
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
      <SignoutButton />
    </Container>
  )
}

export default Settings



const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  height: 100vh;
  padding: 1rem;
`

const IconTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EEECFB;
  border: 1px solid #EEECFB;
  padding: 0rem;
  
    @media (min-width: 768px) {
      margin-top: 1rem;
      padding: 0.3rem 0.8rem;
      width: 80%;  
    }
`

const Wrapper = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 150px;
  border: 1px solid #EEECFB;
  border-top: none;

  @media (min-width: 768px) {
      padding: 0.3rem 0.8rem;
      width: 80%;  
      height: 200px;
    }
`

const SettingsTitle = styled.p`
  color: #4C5F6B;
  cursor: pointer;
  padding-left: 1rem;
  font-size: 12px;

  @media (min-width: 768px) {
      font-size: 18px; 
    }
`

const Input = styled.input`
  padding: 0.6rem;
  margin: 1rem 0 0.5rem 0;
  width: 80%;
  border: 1px solid #BCA0BC;
  border-radius: 6px;

  @media (min-width: 768px) {
    width: 60%;
    margin: 1rem 0 0.5rem 0;
    width: 80%;
    padding: 0.9rem;
  }
` 

const Button = styled.button`
  width: 100px;
  padding: 0.5rem;
  border: none;
  background-color: #404167;
  border-radius: 6px;
  color: #fff;
  margin-top: 1.2rem; 
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  cursor: pointer;
  

  @media (min-width: 768px) {
    padding: 1rem 0.8rem;
    margin-top: 1.2rem; 
    border-radius: 6px;
    width: 15rem;
    font-size: 1rem;

    &:hover {
      opacity: 0.8;
    }
  }
`