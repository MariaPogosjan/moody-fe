import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js';
import { format } from 'date-fns'

import { FEELING_URL } from 'reusables/urls'

const SummaryPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)

  const [x, setX] = useState([])
  const [y, setY] = useState([])

  useEffect(() => {
    fetch(FEELING_URL(userId))
      .then(res => res.json())
      .then(data => console.log)
  }, [userId])

  return (
    <div>Hej</div> 
  )
}

export default SummaryPage 