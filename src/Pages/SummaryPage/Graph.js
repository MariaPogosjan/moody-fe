import React from 'react'
import Plot from 'react-plotly.js'

const Graph = ({x, y}) => {
  return (
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
              //autorange: true,
              range: [0, 1],
              tickvals: [0, 0.2, 0.4, 0.6, 0.8, 1],
              ticktext: ['sad', 'angry', 'stressed', 'neutral', 'relaxed', 'happy']
            },
          }
        }
      />
  )
}

export default Graph 