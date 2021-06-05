import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Container } from 'styled-components/Containers'
import FeelingsForm from './Form'

const Profile = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  return (
    <Container>
      <FeelingsForm accessToken={accessToken}/>
    </Container>
  )
}
export default Profile