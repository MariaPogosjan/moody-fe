import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {SectionSubtitle} from 'styled-components/Titels'

const QuoteImage = styled.img`
  width: 100%;
  filter: grayscale(100%) sepia(20%) contrast(1.2);
  border-radius: 6px;
  border-bottom: 80px;
    @media(min-width: 650px) {
      width: 400px;
      
    }
`

const Quote = () => {
  const [imageLink, setImageLink] = useState('https://healthruwords.com/wp-content/uploads/2017/12/Healthruwords.com_-_Inspirational_Images_-_-Forms-300x300.jpg')

  // useEffect(() => {
  //   const options = {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "f94040aaffmshcecd99c3aee4914p10268ajsn70ed05086acc",
  //       "x-rapidapi-host": "healthruwords.p.rapidapi.com"
  //     }
  //   }
  //   fetch("https://healthruwords.p.rapidapi.com/v1/quotes/?size=medium&maxR=1&t=Happiness", options)
  //     .then(res => res.json())
  //     .then(quote => {
  //       setImageLink(quote[0].media)
  //     })
  // }, [setImageLink])

  return (
    <div>
      <SectionSubtitle>Quote of the day</SectionSubtitle>
      {imageLink && <QuoteImage alt="Quote of the day" src={imageLink} />}
      {/* <SectionSubtitle>Quote of the day</SectionSubtitle> */}
    </div>

  )
}

export default Quote