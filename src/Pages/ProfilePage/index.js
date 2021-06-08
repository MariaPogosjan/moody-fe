import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory  } from 'react-router-dom'

import { Container } from 'styled-components/Containers'
import FeelingsForm from './Form'

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
      <FeelingsForm accessToken={accessToken}/>
    </Container>
  )
}
export default Profile