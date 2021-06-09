import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {SectionSubtitle} from 'styled-components/Titels'

const QuoteImage = styled.img`
  width: 100%;
  filter: grayscale(100%) sepia(20%) contrast(1.2);
  border-radius: 6px;
  border-bottom: 80px;
`

const Quote = () => {
  const [imageLink, setImageLink] = useState()

  useEffect(() => {
    const options = {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "f94040aaffmshcecd99c3aee4914p10268ajsn70ed05086acc",
        "x-rapidapi-host": "healthruwords.p.rapidapi.com"
      }
    }
    fetch("https://healthruwords.p.rapidapi.com/v1/quotes/?size=medium&maxR=1&t=Happiness", options)
      .then(res => res.json())
      .then(quote => {
        setImageLink(quote[0].media)
      })
  }, [setImageLink])

  return (
    <div>
      <SectionSubtitle>Quote of the day</SectionSubtitle>
      {imageLink && <QuoteImage alt="Quote of the day" src={imageLink} />}
      {/* <SectionSubtitle>Quote of the day</SectionSubtitle> */}
    </div>

  )
}

export default Quote