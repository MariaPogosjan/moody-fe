import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { SectionTitle } from 'styled-components/Titels'
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
      <SectionTitle>How are you feeling?</SectionTitle>
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

const Container = styled.section`
   margin: 0 auto;
   height: auto;
   padding: 0 0.5rem 5rem 0.5rem;
   max-width: 600px;
`