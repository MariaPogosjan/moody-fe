import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
 

const Loading = () => {
  return (
    <LoaderContainer>
      <Loader 
       type="Hearts"
       color="#bca0bc"
       height={100}
       width={100}
       
      />
    </LoaderContainer>
  )
}

export default Loading

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`