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
    if(foundItem && foundItem.value <= 0.3) {
       return  'feeling sad'
     } 
     if(foundItem && foundItem.value >= 0.4 && foundItem.value <=0.7) {
      return  'feeling neutral'
    } 
    if(foundItem && foundItem.value > 0.7) {
      return  'feeling happy'
    } 
  }

  return (
    <CalendarWrapper>
          <ModalComponent filteredItem={filteredItem} visible={visible} setVisible={setVisible}/>
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
