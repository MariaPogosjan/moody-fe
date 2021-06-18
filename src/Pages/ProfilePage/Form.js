import React, { useState, useEffect } from 'react'
import { Button, ButtonsWrapper } from 'styled-components/Buttons'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';


import { FormSection, Form, VisibleLabel, Input } from 'styled-components/Forms'
import FeelingsSlider from './Slider'
import { API_URL } from 'reusables/urls'

const CheckboxWrapper = styled.div`
  display: flex;
  margin: 15px;
  align-items: center;
  justify-content: center;
`
const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: '#EAEAEA',
  },

  checkedIcon: {
    backgroundColor: '#BCA0BC',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
});


const FeelingsForm = ({ accessToken, setVisible, setFeeling }) => {
  const [value, setValue] = useState(0)
  const [checked, setChecked] = useState(false)
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState(false)
  const classes = useStyles();


  const generateLabel = (number) => {
    switch (number) {
      case 0:
        return ('😞')
      case 0.2:
        return ('😠')
      case 0.4:
        return ('🤯')
      case 0.6:
        return ('😐')
      case 0.8:
        return ('😌')
      default:
        return ('😃')
    }
  }
  const generateDescription = (description) => {
    if (description) {
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
        <CheckboxWrapper>
          {/* <Input
            id="checkbok"
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(!checked)}
          /> */}
          <Checkbox 
            className={classes.root}
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            checked={checked}
            value={checked}
            onChange={() => setChecked(!checked)}
            id="checkbok"
          />
          <VisibleLabel htmlFor="checkbox">Share with community</VisibleLabel>
        </CheckboxWrapper>

        <ButtonsWrapper>
          <Button type="submit">Register</Button>
        </ButtonsWrapper>

      </Form>
    </FormSection>
  )
}

export default FeelingsForm