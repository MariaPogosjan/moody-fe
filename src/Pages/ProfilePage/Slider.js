import React from 'react'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import sad from 'assets/sad.png'
import angry from 'assets/angry.png'
import stressed from 'assets/stressed.png'
import neutral from 'assets/neutral.png'
import happy from 'assets/happy.png'
import relaxed from 'assets/relaxed.png'

const CustomSlider = withStyles({
  root: {
    color: '#BCA0BC',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover': {
      boxShadow: '0px 0px 0px 8px rgba(84, 199, 97, 0.16)'
    },
    '&$active': {
      boxShadow: '0px 0px 0px 12px rgba(84, 199, 97, 0.16)'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider)

const Image = styled.img`
  width: 70px; 
  height: 70px;
`

const generateLabel = (number) => {
  switch (number) {
    case 0:
      return (<Image alt="sad"src={sad} />)
    case 0.2:
      return (<Image alt="sad"src={angry} />)
    case 0.4:
      return (<Image alt="sad"src={stressed} />)
    case 0.6:
      return (<Image alt="sad"src={neutral} />)
    case 0.8:
      return (<Image alt="sad"src={relaxed}  />)
    default:
      return (<Image alt="sad"src={happy} />)
  }
}

const generateText = (number) => {
  switch (number) {
    case 0:
      return ('Sad')
    case 0.2:
      return ('Angry')
    case 0.4:
      return ('Stressed')
    case 0.6:
      return ('Neutral')
    case 0.8:
      return ('Relaxed')
    default:
      return ('Happy')
  }
}

const Marker = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 40px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(188,160,188);
  background: radial-gradient(circle, rgba(188,160,188,1) 0%, rgba(255,255,255,1) 70%);
`

const SliderWrapper = styled.div`
  width: 70%;
  margin-bottom: 1rem;

  @media(min-width: 350px){
    width: 75%;
    margin-bottom: 2rem;
  }
`

const FeelingsSlider = ({ value, setValue }) => {

  const onSliderChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Marker>{generateLabel(value)}</Marker>
      <SliderWrapper>
        <CustomSlider
          min={0}
          max={1}
          step={0.2}
          valueLabelFormat={generateText(value)}
          valueLabelDisplay="auto"
          defaultValue={0}
          value={value}
          onChange={onSliderChange}
        />
      </SliderWrapper>
    </>
  )
}

export default FeelingsSlider