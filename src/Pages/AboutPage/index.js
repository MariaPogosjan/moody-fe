import React from 'react'
import styled from 'styled-components'

import { Container } from 'styled-components/Containers'
import { SectionTitle, SectionSubtitle } from 'styled-components/Titels'

const Image = styled.img`
  width:100%;
  height: 40vh;
  object-fit: cover;

  @media (min-width: 768px) {
    width: 40%;
    border: 1px solid black;
  }
`
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  border: 1px solid blue;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Text = styled.p`

`

const About = () => {

  return (
    <Container>
      <SectionTitle>
        About Moody
      </SectionTitle>
      <Text>
        Track as often or as little as you'd like!
        Support and get feedback from others
      </Text>
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
          <Image src="./assets/card2.jpg" />
          <div>
            <SectionSubtitle>Share your feelings with others </SectionSubtitle>
            <Text>
              Sharing health information with family and friend networks is a way to control one’s health identity,keep loved ones up-to-date, gain social support
            </Text>
          </div>
        </Card>
        <Card>
          <Image src="./assets/card3.jpg" />
          <div>
            <SectionSubtitle>Talk about your feelings </SectionSubtitle>
            <Text>
              Post your thoughts on our forum and get support from other users.
            </Text>
          </div>
        </Card>

      </CardsContainer>
    </Container>
  )
}
export default About