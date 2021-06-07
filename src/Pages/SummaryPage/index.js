import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js';
import { format } from 'date-fns'
import styled from 'styled-components'

import { FEELING_URL } from 'reusables/urls'
//import { Container } from 'styled-components/Containers'

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
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)

  const [x, setX] = useState([])
  const [y, setY] = useState([])

  useEffect(() => {
    fetch(FEELING_URL(userId))
      .then(res => res.json())
      .then(data => {
        setX(data.feelings.map(item => format(new Date(item.createdAt), 'd MMM H:mm:ss')))
        setY(data.feelings.map(item => item.value))
      })
  }, [userId])


  return (
    <Container>
      <Plot
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'markers+lines',
            //marker: { color: '#83A0A0' },
            hoverinfo: 'y',
            marker: {
              color: '#83A0A0',
              line: {
                color: '#4C5F6B',
                width: 3,
              },
              symbol: 'square',
              size: 16
            }
          }
        ]}
        layout={
          {
            //width: 350,
            autosize: true,
            xaxis:
              { autorange: true },
            yaxis: {
              autorange: true,
              range: [0, 1],
              tickvals: [0, 0.2, 0.4, 0.6, 0.8, 1],
              ticktext: ['sad', 'angry', 'stressed', 'neutral', 'relaxed', 'happy']
            },
          }
        }
      />
    </Container>
  )
}

export default SummaryPage