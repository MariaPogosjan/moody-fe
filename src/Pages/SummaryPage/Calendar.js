import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarComponent = ({ feelings }) => {
  const [date, setDate] = useState(new Date())
  const [visible, setVisble] = useState(false)
  const [filteredItem, setFiltredItem] = useState([])

  const onChange = (date) => {
    setDate(date)
  }

  const tileFunction = (date) => {
    console.log(feelings)
   const filteredItem = feelings.filter(item => new Date(item.createdAt).toString()  === new Date(date).toString())
   console.log(filteredItem)
   if(filteredItem) {
     setVisble(true)
     setFiltredItem(filteredItem)
   } else {
     setVisble(false)
     setFiltredItem([])
   }
}

  return (
    <div>
      <Calendar
/*         tileContent={tileFunction}
 */     showWeekNumbers
        onChange={onChange}
        value={date}
        onClickDay={tileFunction} 
      />
      {/* {date.display && <p>{date.info}</p>} */}
    {/*  <p>{date.toDateString()}</p> */}
    <div style={{border: "1px solid red"}}>
    {visible && <div>{filteredItem.map(item => <p>{item.value}</p>)}</div>}
    </div>
    </div>
  )
}

export default CalendarComponent