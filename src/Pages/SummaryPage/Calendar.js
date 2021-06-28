import React, { useState } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'

import ModalComponent from './Modal'

const CalendarComponent = ({ feelings }) => {
  const [date, setDate] = useState(new Date())
  const [visible, setVisible] = useState(false)
  const [filteredItem, setFiltredItem] = useState([])

  const onChange = (date) => {
    setDate(date)
  }

  const tileFunction = (date) => {
    const filteredItem = feelings.filter(item => format(new Date(item.createdAt), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd'))
    if (filteredItem && filteredItem.length > 0) {
      setVisible(true)
      setFiltredItem(filteredItem)
    } else {
      setVisible(false)
      setFiltredItem([])
    }
  }

  const determineColor = (date) => {
    const foundItem = feelings.find(item => format(new Date(item.createdAt), 'yyyy-MM-dd') === format(new Date(date.date), 'yyyy-MM-dd'))
    if (foundItem && foundItem.value <= 0.3) {
      return 'feeling sad'
    }
    if (foundItem && foundItem.value >= 0.4 && foundItem.value <= 0.7) {
      return 'feeling neutral'
    }
    if (foundItem && foundItem.value > 0.7) {
      return 'feeling happy'
    }
  }

  return (
    <CalendarWrapper>
      <LegendContainer>
        <LegendItemSad>Sad</LegendItemSad>
        <LegendColorSad></LegendColorSad>
        <LegendColorNutral></LegendColorNutral>
        <LegendColorHappy></LegendColorHappy>
        <LegendItemHappy>Happy</LegendItemHappy>
      </LegendContainer>
      <ModalComponent filteredItem={filteredItem} visible={visible} setVisible={setVisible} />
      <Calendar
        onChange={onChange}
        value={date}
        onClickDay={tileFunction}
        tileClassName={determineColor}
      />
    </CalendarWrapper>
  )
}

export default CalendarComponent


const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 1rem;
`
const LegendContainer = styled.div`
  display: flex;
  padding-bottom: 20px; 
`

const LegendItemHappy = styled.div`
  font-size: 10px; 
  padding-left: 5px; 
`
const LegendColor = styled.div`
  width: 40px; 
  height: 14px;
`
const LegendColorSad = styled(LegendColor)`
  background-color: #607474;
`
const LegendColorNutral = styled(LegendColor)`
  background-color: #83A0A0;
`
const LegendColorHappy = styled(LegendColor)`
  background-color: #b0c6c6
`

const LegendItemSad = styled.div`
  font-size: 10px;
  padding-right: 5px; 
`

