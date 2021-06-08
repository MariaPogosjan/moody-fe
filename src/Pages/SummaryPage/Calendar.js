import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import "index.css";



const CalendarComponent = ({ feelings }) => {
  const [date, setDate] = useState(new Date())
  const [visible, setVisble] = useState(false)
  const [filteredItem, setFiltredItem] = useState([])
  
  

  const onChange = (date) => {
    setDate(date)
  }

  const tileFunction = (date) => {
    const filteredItem = feelings.filter(item => format(new Date(item.createdAt), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd'))
    if (filteredItem) {
      setVisble(true)
      setFiltredItem(filteredItem)

    } else {
      setVisble(false)
      setFiltredItem([])
    }
  }
  const determineColor = (date, view) => {
    const foundItem = feelings.find(item => format(new Date(item.createdAt), 'yyyy-MM-dd') === format(new Date(date.date), 'yyyy-MM-dd'))
    if(foundItem) {
       return  'hidden'
     } 
  }

  return (
    <div>
      <Calendar
        showWeekNumbers
        onChange={onChange}
        value={date}
        onClickDay={tileFunction}
        tileClassName={determineColor}
      />
      <div>
        {visible && <div>{filteredItem.map(item => <p>{item.value}:{item.description}</p>)}</div>}
      </div>
    </div>
  )
}

export default CalendarComponent