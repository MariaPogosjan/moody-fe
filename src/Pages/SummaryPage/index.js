import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { format } from 'date-fns'
import styled from 'styled-components'

import { FEELING_URL } from 'reusables/urls'
import CalenderComponent from './Calendar'
import feeling from 'reducers/feeling'
import Graph from './Graph'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #fff;
  margin:0;
  height: auto;
  min-height: 100vh;
`

const SummaryPage = () => {
  const [x, setX] = useState([])
  const [y, setY] = useState([])

  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  const feelings = useSelector(store => store.feeling.feelings)
  const dispatch = useDispatch()


  const getAverageValue = (array) => {
    const averages = [];
    const dates = [];
    for (const item of array) {
      if (!dates.includes(new Date(item.createdAt).toDateString())) {
        dates.push(new Date(item.createdAt).toDateString());
      }
    }
    for (const date of dates) {
      let day = {
        createdAt: date,
        sum: 0,
        count: 0
      };
      for (const item of array) {
        if (date === new Date(item.createdAt).toDateString()) {
          day.sum += item.value;
          day.count++;
        }
      }
      day.average = day.sum / day.count;
      delete day.sum;
      delete day.count;
      averages.push(day);
    }
    console.log(averages)
    return averages;
  };



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
    const avaragedArray = getAverageValue(feelings)
    console.log(avaragedArray)
    setX(avaragedArray.map(item => format(new Date(item.createdAt), 'd MMM')))
    setY(avaragedArray.map(item => item.average))
  }, [feelings])

  return (
    <Container>
      <CalenderComponent feelings={feelings} />
      <Graph x={x} y={y} />
    </Container>
  )
}

export default SummaryPage