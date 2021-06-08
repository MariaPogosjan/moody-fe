import React from 'react'
import Plot from 'react-plotly.js'
import styled from 'styled-components'

const GraphWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;

  @media(min-width: 650px) {
    width:60%
  } 
`

const Graph = ({x, y}) => {
  return (
   <GraphWrapper>
      <Plot
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: "100%", height: "100%", padding:"0px", margin:"0px" }}
          useResizeHandler={true}
          data={[
            {
              x: x,
              y: y,
              type: 'scatter',
              mode: 'markers+lines',
              hoverinfo: 'y',
              marker: {
                color: '#83A0A0',
                line: {
                  color: '#4C5F6B',
                  width: 3,
                },
                symbol: 'circle',
                size: 14
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
                //autorange: true,
                range: [0, 1.1],
                tickvals: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ticktext: ['sad', 'angry', 'stressed', 'neutral', 'relaxed', 'happy']
              },
            }
          }
        />
      </GraphWrapper> 
  )
}

export default Graph 