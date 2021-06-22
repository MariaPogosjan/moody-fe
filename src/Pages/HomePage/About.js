import React from 'react'
import styled from 'styled-components'

import { Container } from 'styled-components/Containers'

const About = () => {
  return (
    <Container>
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
}
export default About

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 5rem 1rem;

  @media (min-width: 768px) {
    margin: 2rem 2rem 6rem 2rem;

  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
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
  color: #404167;
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