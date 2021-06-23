import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Buttons from './Buttons'
import About from './About'

const Home = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  return (
    <>
    <Container>
      <FlexWrapper>
      <HeroImageWrapper>
        <HeroImage src="./assets/hero_image.jpg"/>
      </HeroImageWrapper>
      <HeroTextWrapper>
        <HeroTitle>Moody is always on your side</HeroTitle>
        <HeroText>
          Track your feelings and share it with all of your friends and family as often or as little as you'd like.
        </HeroText>
        {!accessToken && <Buttons />}   
      </HeroTextWrapper>
      </FlexWrapper>
    </Container>
    <About />
    </>
  )
}

export default Home
 
const Container = styled.section`
   padding: 0 1rem;
   display: flex;
   flex-direction: column;
   min-height: 90vh;

   @media (min-width: 768px) {
    min-height: 50vh;
    box-shadow: 0 4px 4px -2px #EEECFB;
    margin-top: 3rem;
    padding: 3rem;
  }
`
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;  
    
   }
`

const HeroImageWrapper = styled.div`
  height: 40vh;
  width: 100%;
` 

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroTextWrapper = styled.div`
  width: 100%;
  margin-left: 0.5rem;
`

const HeroTitle = styled.h1`
  color: #404167;
  font-size: 1.3rem;
  margin-top: 1.8rem;
  width: 90%;

  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
` 
const HeroText = styled.p`
  color: gray;
  font-size: 0.8rem;
  line-height: 1.1rem;
  width: 80%;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    line-height: 2rem;
  }
`



