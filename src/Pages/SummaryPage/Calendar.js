import React, { useState, useRef } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import "index.css";



const CalendarComponent = ({ feelings }) => {
  const [date, setDate] = useState(new Date())
  const [visible, setVisble] = useState(false)
  const [filteredItem, setFiltredItem] = useState([])
  



  //console.log(test)
  //test.className = 'react-calendar__month-view__days__day'
  

  const onChange = (date) => {
    setDate(date)
  }

  const tileFunction = (date) => {
    console.log(feelings)
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
    console.log(date)
    if (view === 'month' && feelings.find(item => format(new Date(item.createdAt), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd'))) {
      console.log("hidden")
      return 'hidden'
    }
  }

  return (
    <div>
      <Calendar
        showWeekNumbers
        onChange={onChange}
        value={date}
        onClickDay={tileFunction}
        tileClassName={"hidden"}
      />
      <div>
        {visible && <div>{filteredItem.map(item => <p>{item.value}:{item.description}</p>)}</div>}
      </div>
    </div>
  )
}

export default CalendarComponent