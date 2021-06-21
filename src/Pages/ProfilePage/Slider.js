import React from 'react'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import sad from 'assets/sad.png'
import annoyed from 'assets/annoyed.png'
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

const generateLabel = (number) => {
  switch (number) {
    case 0:
      return (<img alt="sad"src={sad} style={{width: 25, height: 25}} />)
    case 0.2:
      return (<img alt="sad"src={annoyed} style={{width: 25, height: 25}} />)
    case 0.4:
      return (<img alt="sad"src={stressed} style={{width: 25, height: 25}} />)
    case 0.6:
      return (<img alt="sad"src={neutral} style={{width: 25, height: 25}} />)
    case 0.8:
      return (<img alt="sad"src={relaxed} style={{width: 25, height: 25}} />)
    default:
      return (<img alt="sad"src={happy} style={{width: 25, height: 25}} />)
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

const Marker = styled.p`
  color: #fff;
  background-color: #BCA0BC;
  margin-bottom: 40px;
  padding: 10px 10px;
  border-radius: 6px;
  width: 100px;
  text-align: center;
`

const SliderWrapper = styled.div`
  width: 80%;
  padding: 0 30px;
`

const FeelingsSlider = ({ value, setValue }) => {

  const onSliderChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Marker>{generateText(value)}</Marker>
      <SliderWrapper>
        <CustomSlider
          min={0}
          max={1}
          step={0.2}
          valueLabelFormat={generateLabel(value)}
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