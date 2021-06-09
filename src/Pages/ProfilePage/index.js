import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory  } from 'react-router-dom'

import { Container } from 'styled-components/Containers'
import {SectionSubtitle} from 'styled-components/Titels'
import FeelingsForm from './Form'
import Quote from './Quote'

const Profile = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if(!accessToken){
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <Container>
      <SectionSubtitle>How are you feeling?</SectionSubtitle>
      <FeelingsForm accessToken={accessToken}/>
      <Quote />
    </Container>
  )
}
export default Profile