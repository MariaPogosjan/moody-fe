import React from 'react'
import styled from 'styled-components'

import { SectionTitle, SectionSubtitle } from 'styled-components/Titels'

const Container = styled.div`
  background-color: #fff;
  margin:0;
  height: auto;
  min-height: 100vh;
  padding: 0 1rem 70px 1rem;
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
  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 10px;
  }
`
const Image = styled.img`
  width:100%;
  height: 40vh;
  object-fit: cover;
  border-radius: 50%;
  filter: grayscale(80%);

  @media (min-width: 768px) {
    width: 40%;
    height: auto;
  }
`

const Text = styled.p`

  @media (min-width: 768px) {
      padding-left: 10px;
    }
`

const Contact = () => {
  return (
    <Container>
      <SectionTitle>Contact us</SectionTitle>
      <CardsContainer>
        <Card>
          <Image src="./assets/maria.png" />
          <div>
            <SectionSubtitle>Maria Pogosian</SectionSubtitle>
            <Text>
            I love to come up with crazy ambitious ideas and make them come to life. I wanted to work with development and went from thinking about it to actually do something about it. Six months later I learned to code professionally. And today it is my biggest passion in life.
            </Text>
          </div>
        </Card>
        <Card>
          <Image src="./assets/ekaterina.jpg" />
          <div>
            <SectionSubtitle>Ekaterina Klimenko</SectionSubtitle>
            <Text>
              Frontend developer with background in research and project management. I love solving problems and come up with solutions that can be achieved in reasonable time and using assigned budget. I love working in a team and am used to being a part of a multicultural work environment.
            </Text>
          </div>
        </Card>

      </CardsContainer>
    </Container>
  )
}

export default Contact

