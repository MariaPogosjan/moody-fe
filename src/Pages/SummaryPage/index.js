import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js';
import { format } from 'date-fns'
import styled from 'styled-components'

import { FEELING_URL } from 'reusables/urls'
import { Container } from 'styled-components/Containers'

const PlotWrapper = styled.div`
width: 100%;
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
        console.log(data)
        setX(data.feelings.map(item => format(new Date(item.createdAt), 'd MMM H:mm:ss')))
        setY(data.feelings.map(item => item.value))
      })
  }, [userId])


  return (
    <Container>
      <PlotWrapper>
        <Plot
          config={{ displayModeBar: false, responsive: true }}
          data={[
            {
              x: x,
              y: y,
              type: 'scatter',
              mode: 'lines+markers+text',
              marker: { color: 'blue' },
              opacity: 0.5,
              hoverinfo: 'y'

            }
          ]}
          layout={
            {
              // width: 300,
              // height: 400,
              autosize: true,
              xaxis: {
                title: 'timeline'
              },
              yaxis: {
                title: 'mood',
                //showticklabels: false,
                range: [0, 1],
                tickvals: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ticktext: ['sad', 'angry', 'stressed', 'okay', 'better', 'happy']
              },
              title: {
                text: 'My mood',
                font: {
                  family: "Arial", size: 50, color: "red"
                }
              }
            }
          }
        />
      </PlotWrapper>
    </Container>
  )
}

export default SummaryPage