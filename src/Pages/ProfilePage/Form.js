import React, { useState, useEffect } from 'react'
import { Button, ButtonsWrapper } from 'styled-components/Buttons'

import { FormSection, Form, VisibleLabel, Input } from 'styled-components/Forms'
import FeelingsSlider from './Slider'
import { API_URL } from 'reusables/urls'


const FeelingsForm = ({ accessToken, setVisible, setFeeling }) => {
  const [value, setValue] = useState(0)
  const [checked, setChecked] = useState(false)
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState(false)


  const generateLabel = (number) => {
    switch (number) {
      case 0:
        return ('😞')
      case 0.2:
        return ('🙁')
      case 0.4:
        return ('🤯')
      case 0.6:
        return ('😐')
      case 0.8:
        return ('🙂')
      default:
        return ('😃')
    }
  }
  const generateDescription = (description) => {
    if(description) {
      return `because of ${description}`
    } else return ""
  }

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
      .then(data => {
        if (data.success) {
          setSuccess(true)
          setFeeling(data.feeling.value)
        } else {
          setDescription("")
          setValue(0)
          setSuccess(false)
        }
      })
    if (checked) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        },
        body: JSON.stringify({ message: `I am feeling ${generateLabel(value)} today ${generateDescription(description)}...` })
      }
      fetch(API_URL('thoughts'), options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    }
  }

  useEffect(() => {
    if (success) {
      //alert("Thank you for registering!")
      setSuccess(false)
      setVisible(true)
    }
  }, [success, setVisible])

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
        <VisibleLabel htmlFor="input">Share with community</VisibleLabel>
        <Input
          id="checkbok"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(!checked)}
        />

        <ButtonsWrapper>
          <Button type="submit">Register</Button>
        </ButtonsWrapper>

      </Form>
    </FormSection>
  )
}

export default FeelingsForm