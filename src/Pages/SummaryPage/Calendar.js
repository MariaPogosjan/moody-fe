import { red } from '@material-ui/core/colors'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const array = [
  {
    date: "Thu Jun 12 2021 00:00:00 GMT+0200",
    feeling: 0.5
  },
  {
    date: "Thu Jun 10 2021 00:00:00 GMT+0200",
    feeling: 0.8
  },
  {
    date: "Thu Jun 13 2021 00:00:00 GMT+0200",
    feeling: 0.3
  },
  {
    date: "Thu Jun 5 2021 00:00:00 GMT+0200",
    feeling: 0.4
  },
  {
    date: "Thu Jun 16 2021 00:00:00 GMT+0200",
    feeling: 0.7
  },
  {
    date: "Thu Jun 14 2021 00:00:00 GMT+0200",
    feeling: 0.1
  }]


const CalendarComponent = () => {
  const [date, setDate] = useState(new Date())
  const [visible, setVisble] = useState(false)
  const [filteredItem, setFiltredItem] = useState([])

  const onChange = (date) => {
    setDate(date)
  }

 /*  const onClick = () => {
    setDate({display: true})
    console.log(date)
  } */

  const tileFunction = (date) => {
   const filteredItem = array.filter(item => new Date(item.date).toString()  === new Date(date).toString())
   console.log(filteredItem)
   if(filteredItem) {
     setVisble(true)
     setFiltredItem(filteredItem)
   } else {
     setVisble(false)
     setFiltredItem([])
   }
/*     return <p>{filteredItem}</p>
 */  }

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
    {visible && <div>{filteredItem.map(item => <p>{item.feeling}</p>)}</div>}
    </div>
    </div>
  )
}

export default CalendarComponent