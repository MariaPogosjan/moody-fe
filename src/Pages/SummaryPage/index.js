import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'
import { format, isToday, subDays, subMonths, subYears } from 'date-fns'
import styled from 'styled-components'

import { FEELING_URL } from 'reusables/urls'
import CalenderComponent from './Calendar'
import feeling from 'reducers/feeling'
import Graph from './Graph'
import { SectionTitle } from 'styled-components/Titels'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem 0 0 0;
  height: 100%;
  min-height: 100vh;
`

const FilterButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  background-color: #83A0A0;
  border: 1px solid #4C5F6B !important;
  width: 30px;
  cursor: pointer;
`

const SummaryPage = () => {
  const [x, setX] = useState([])
  const [y, setY] = useState([])
  const [range, setRange] = useState('day')

  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  const feelings = useSelector(store => store.feeling.feelings)
  const dispatch = useDispatch()
  const history = useHistory()


  const getAverageValue = (array) => {
    const averages = []
    const dates = []
    for (const item of array) {
      if (!dates.includes(new Date(item.createdAt).toDateString())) {
        dates.push(new Date(item.createdAt).toDateString())
      }
    }
    for (const date of dates) {
      let day = {
        createdAt: date,
        sum: 0,
        count: 0
      }
      for (const item of array) {
        if (date === new Date(item.createdAt).toDateString()) {
          day.sum += item.value
          day.count++
        }
      }
      day.average = day.sum / day.count
      delete day.sum
      delete day.count
      averages.push(day)
    }
    return averages
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }
    fetch(FEELING_URL(userId), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(feeling.actions.setFeelings(data.feelings))
            dispatch(feeling.actions.setErrors(null))
          })
        } else {
          dispatch(feeling.actions.setErrors(data))
        }
      })
  }, [userId, accessToken, dispatch])


  useEffect(() => {
    
    if (range === "day") {
      const filterFeelingDay = feelings.filter(item => isToday(new Date(item.createdAt)))
      setX(filterFeelingDay.map(item => format(new Date(item.createdAt), 'HH:mm')))
      setY(filterFeelingDay.map(item => item.value))
    } else if (range === "week") {
      const filterFeelingWeek = feelings.filter((item) => new Date(item.createdAt) > subDays(Date.now(), 7))
      const avaragedArray = getAverageValue(filterFeelingWeek)
      setX(avaragedArray.map(item => format(new Date(item.createdAt), 'd MMM')))
      setY(avaragedArray.map(item => item.average))
    } else if (range === 'month') {
      const filterFeelingMonth = feelings.filter((item) => new Date(item.createdAt) > subMonths(Date.now(), 1))
      const avaragedArray = getAverageValue(filterFeelingMonth)
      setX(avaragedArray.map(item => format(new Date(item.createdAt), 'd MMM')))
      setY(avaragedArray.map(item => item.average))
    } else {
      const filterFeelingYear = feelings.filter((item) => new Date(item.createdAt) > subYears(Date.now(), 1))
      const avaragedArray = getAverageValue(filterFeelingYear)
      setX(avaragedArray.map(item => format(new Date(item.createdAt), 'd MMM')))
      setY(avaragedArray.map(item => item.average))
    }
  }, [feelings, range])

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

return (
  <Container>
    <SectionTitle>Summary of your feelings </SectionTitle>
    <div style={{display: "flex" }}>
      <div style={{fontSize: "10px", paddingRight: "5px"}} >Sad</div>
      <div style={{backgroundColor: "#607474", width: "40px", height: "14px"}}></div>
      <div style={{backgroundColor: "#83A0A0", width: "40px", height: "14px"}}></div>
      <div style={{backgroundColor: "#b0c6c6", width: "40px", height: "14px"}}></div>
      <div style={{fontSize: "10px", paddingLeft: "5px" }}>Happy</div>
    </div>
    <CalenderComponent feelings={feelings} />
    <div style={{display: "flex"}}>
      <FilterButton onClick={()=> setRange('day')}>1d</FilterButton>
      <FilterButton onClick={()=> setRange('week')}>7d</FilterButton>
      <FilterButton onClick={()=> setRange('month')}>1m</FilterButton>
      <FilterButton onClick={()=> setRange('year')}>1y</FilterButton>
    </div>  
    <Graph x={x} y={y} />
  </Container>
)
}

export default SummaryPage