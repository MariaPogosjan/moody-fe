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


const SummaryPage = () => {
  const [x, setX] = useState([])
  const [y, setY] = useState([])
  const [range, setRange] = useState('week')
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


  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  const getAvareges = (grouppedObject) => {
    const avaragedArray = Object.entries(grouppedObject).map(
      ([key, Objectvalue]) =>
        `${key} ${(
          Objectvalue.map((a) => a.value).reduce((a, b) => a + b) /
          Objectvalue.length
        ).toFixed(2)}`
    )

    return avaragedArray
      .map(item => item.split(' '))
      .map(item => ({ createdAt: item[0], value: Number(item[1]) }))
  }

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
      const formatedDateYearFeelings = filterFeelingYear.map(item => ({ ...item, createdAt: format(new Date(item.createdAt), 'yyyy-MM') }))
      const grouppedArray = groupBy(formatedDateYearFeelings, 'createdAt')
      const finalArray = getAvareges(grouppedArray)
      setX(finalArray.map(item => format(new Date(item.createdAt), 'MMM')))
      setY(finalArray.map(item => item.value))
    }
  }, [feelings, range])

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <Container>
      <SectionTitle>Your feelings </SectionTitle>
      <CalenderComponent feelings={feelings} />
      <Graph x={x} y={y} range={range} setRange={setRange}/>
    </Container>
  )
}

export default SummaryPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem 0 0 0;
  height: 100%;
  min-height: 100vh;
`