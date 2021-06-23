import React from 'react'
import Plot from 'react-plotly.js'
import styled from 'styled-components'

const Graph = ({x, y, range, setRange }) => {
  return (
   <GraphWrapper>
        <div style={{ display: "flex" }}>
        <FilterButtonDay range={range} onClick={() => setRange('day')}>1d</FilterButtonDay>
        <FilterButtonWeek range={range} onClick={() => setRange('week')}>7d</FilterButtonWeek>
        <FilterButtonMonth range={range} onClick={() => setRange('month')}>1m</FilterButtonMonth>
        <FilterButtonYear range={range} onClick={() => setRange('year')}>1y</FilterButtonYear>
      </div>
      <Plot
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: "100%", height:"450px", padding:"0px", margin:"0px" }}
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
              autosize: true,
              xaxis:
                { autorange: true },
              yaxis: {
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


const GraphWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 80px 0;

  @media(min-width: 650px) {
    width:60%
  } 
`

const FilterButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #4C5F6B !important;
  width: 40px;
  margin-top: 30px;
  cursor: pointer;
`

const FilterButtonDay = styled(FilterButton)`
  background-color: ${props => (props.range === "day" ? "#4C5F6B" : "#83A0A0")};
`
const FilterButtonWeek = styled(FilterButton)`
  background-color: ${props => (props.range === "week" ? "#4C5F6B" : "#83A0A0")};
`

const FilterButtonMonth = styled(FilterButton)`
  background-color: ${props => (props.range === "month" ? "#4C5F6B" : "#83A0A0")};
`
const FilterButtonYear = styled(FilterButton)`
  background-color: ${props => (props.range === "year" ? "#4C5F6B" : "#83A0A0")};
`