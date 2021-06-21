import React from 'react'
import styled from 'styled-components'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import EmailIcon from '@material-ui/icons/Email';

const Contact = () => {
  return (
    <>
      <SectionTitle>Contact us</SectionTitle>
      <CardsContainer>
        <Card>
          <ImageContainer>
            <Image src="./assets/mariapogosjan.jpg" />
          </ImageContainer>
          <div>
            <SectionSubtitle>Maria Pogosjan</SectionSubtitle>
            <Text>
            I love to come up with crazy ambitious ideas and make them come to life. I wanted to work with development and went from thinking about it to actually do something about it. Six months later I learned to code professionally. And today it is my biggest passion in life.
            </Text>
            <IconsContainer>
              <LinkedInIcon className="contact-link"/>
              <GitHubIcon className="contact-link" />
              <EmailIcon className="contact-link" />
            </IconsContainer>
          </div>
        </Card>
        <Card>
          <FlexReverese>
            <div>
              <SectionSubtitle>Ekaterina Klimenko</SectionSubtitle>
              <Text>
                Frontend developer with background in research and project management. I love solving problems and come up with solutions that can be achieved in reasonable time and using assigned budget. I love working in a team and am used to being a part of a multicultural work environment.
              </Text>
              <IconsContainer>
                <LinkedInIcon className="contact-link"/>
                <GitHubIcon className="contact-link" />
                <EmailIcon className="contact-link" />
            </IconsContainer>
            </div>
            <ImageContainer>
              <Image src="./assets/ekaterina.jpg" />  
            </ImageContainer>
          </FlexReverese>
        </Card>
      </CardsContainer>
    </>
  )
}

export default Contact


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
  justify-content: center;
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
  justify-content: space-around;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`

const ImageContainer = styled.div`
  width: 80%;
  margin: 2rem 3rem 2rem 3rem;
  
  @media (min-width: 768px) {
    width: 100%;
  }
`

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  filter: grayscale(70%);

  @media (min-width: 768px) {
    
  }
`

const SectionSubtitle = styled.h2`
  color: #4C5F6B;
  text-align: center;

  @media (min-width: 768px) {
      text-align: left;
      margin-left: 2rem;
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

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;

  @media (min-width: 768px) {
    width: 80%;
    margin-left: 2rem;
    justify-content: flex-start;

  }
`