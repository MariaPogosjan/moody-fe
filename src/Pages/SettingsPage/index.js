import React, { useState, useRef } from 'react' 
import { useSelector } from 'react-redux'
import { 
    FormSection, 
    Form, 
    VisibleLabel, 
    Input } 
from 'styled-components/Forms'
import { ButtonsWrapper, Button } from 'styled-components/Buttons'
import { PROFILE_IMAGE_URL } from 'reusables/urls'


const Settings = () => {
  const fileInput = useRef()
  const userId = useSelector(store => store.user.userId)
  
  const onFormSubmit= (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', fileInput.current.files[0])
    const options = {
      method: 'POST', 
      body: formData
    }
    fetch(PROFILE_IMAGE_URL(userId), options)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <FormSection>
      <Form onSubmit={onFormSubmit}> 
        <VisibleLabel htmlFor="file-input">Text label</VisibleLabel>
        <Input type="file" ref={fileInput} id="file-input" />
        <ButtonsWrapper>
          <Button type="submit">Upload</Button>
        </ButtonsWrapper>

      </Form>
    </FormSection>
  )
}

export default Settings