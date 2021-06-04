import React from 'react'
import styled from 'styled-components'
import { Container } from 'styled-components/Containers.js'

import Buttons from './Buttons'

const HeroTextWrapper = styled.div`
  width: 100%;
`
const HeroTitle = styled.h1`
  color: #404167;
` 
const HeroText = styled.p`
  color: gray;
`
const HeroImageWrapper = styled.div`
  height: 40vh;
  width: 100%;
` 
const HeroImage = styled.img`
  width:100%;
  height: 40vh;
  object-fit: cover;
`

const Home = () => {
  return (
    <Container>
      <HeroImageWrapper>
        <HeroImage src="./assets/hero_image.jpg"/>
      </HeroImageWrapper>
      <HeroTextWrapper>
        <HeroTitle>Moody is always on your side</HeroTitle>
        <HeroText>Track your feelings and share it with you friends. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</HeroText>
      </HeroTextWrapper>
      <Buttons />     
    </Container>
  )
}

export default Home