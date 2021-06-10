import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Container } from 'styled-components/Containers'
import { SectionSubtitle } from 'styled-components/Titels'
import FeelingsForm from './Form'
import Quote from './Quote'

const Profile = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [feeling, setFeeling] = useState("")

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <Container>
      <SectionSubtitle>How are you feeling?</SectionSubtitle>
      <FeelingsForm 
        accessToken={accessToken} 
        setVisible={setVisible} 
        setFeeling={setFeeling} />
      <Quote 
        visible={visible} 
        setVisible={setVisible} 
        feeling={feeling} />
    </Container>
  )
}
export default Profile