import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Buttons from './Buttons'

const Home = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  return (
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

      <Container>
      <SectionTitle>
        About moody
      </SectionTitle>
      <CardsContainer>
        <Card>
          <Image src="./assets/card1.jpg" />
          <div>
            <SectionSubtitle>Track your moods</SectionSubtitle>
            <Text>
              Just as it is important to manage health behaviors such as sleep and exercise, the importance of tracking psychological elements of health has been long recongnized. In our app you can register your feelings and see the overview over time.
            </Text>
          </div>
        </Card>
        <Card>
          <FlexReverese>
            <div>
            <SectionSubtitle>Share your feelings with others </SectionSubtitle>
            <Text>
              Sharing health information with family and friend networks is a way to control one’s health identity, keep loved ones up-to-date, gain social supporta and post your thoughts on our forum and get support from other users.
            </Text>
            </div>
            <Image src="./assets/card2.jpg" />
          </FlexReverese>
        </Card>
      </CardsContainer>
    </Container>
  )
    </Container>
  )
}

export default Home
 
const Container = styled.section`
   padding: 0 1rem;
   margin-top: 3rem;
   display: flex;
   flex-direction: column;
   min-height: 100vh;

   @media (min-width: 768px) {
    min-height: 30vh;
  }
`
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    padding: 3rem;
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

const SectionTitle = styled.h1`
  color: #404167;
  text-align: center;
  font-size: 2.1rem;
  margin: 3rem 0;
` 

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem 6rem 2rem;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    border: 2px solid #EEECFB;
  }
`

const FlexReverese = styled.div`
    display: flex;
    flex-direction: column-reverse;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
  }
`

const Image = styled.img`
  width: 100%;
  height: 40vh;
  object-fit: cover;

  @media (min-width: 768px) {
    width: 40%;
    height: auto;
  }
`

const SectionSubtitle = styled.h2`
  color: #4C5F6B;
  text-align: center;

  @media (min-width: 768px) {
      margin-left: 2rem;
      text-align: left;
    }
` 

const Text = styled.p`
 width: 100%;
 text-align: center;
 line-height: 1.6rem;
 color: grey;

  @media (min-width: 768px) {
      margin-left: 2rem;
      text-align: left;
      width: 80%;
    }
`