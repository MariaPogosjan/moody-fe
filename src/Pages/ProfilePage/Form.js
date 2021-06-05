import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'

import { Button, ButtonsWrapper } from 'styled-components/Buttons'
import { FormSection, Form, VisibleLabel, Input } from 'styled-components/Forms'
import FeelingsSlider from './Slider'
import { API_URL } from 'reusables/urls'

const FeelingsForm = ({ accessToken }) => {
  const [value, setValue] = useState(0)
  const [description, setDescription] = useState("")

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ value, description })
    }

    fetch(API_URL('feelings'), options)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <FormSection>
      <Form onSubmit={onFormSubmit}>
        <FeelingsSlider value={value} setValue={setValue} />
        <VisibleLabel htmlFor="input">What made you feel this way?</VisibleLabel>
        <Input
          id="input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonsWrapper>
          <Button type="submit">Register</Button>
        </ButtonsWrapper>
      </Form>
    </FormSection>
  )
}

export default FeelingsForm