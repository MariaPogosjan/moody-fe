import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import FormComponent from './FormComponent'
import MessageList from './MessageList'
import Loader from './Loader'

import { SectionTitle } from 'styled-components/Titels'

const Thoughts = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2500)

  }, []) 
 
  return (
    <PageContainer>
      <SectionTitle>Share your thoughts</SectionTitle>
      <FormComponent page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} />
      {isLoading ?  
        <Loader/> : 
        <MessageList page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage}/>
      }
    </PageContainer>
  )
}

export default Thoughts

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.2rem 1rem;
  padding-bottom: 70px;
  
  @media (min-width: 768px) {
    margin: 2rem 6rem 5rem 6rem;
    padding-bottom: 0;
  }
`