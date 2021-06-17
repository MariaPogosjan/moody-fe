import React from 'react'
import styled from 'styled-components'

import FormComponent from './FormComponent'
import MessageList from './MessageList'

const SectionTitle = styled.h1`
  color: #4C5F6B;
  font-size: 25px;
` 
const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`

const Thoughts = () => {
  return (
    <PageContainer>
    <SectionTitle>Community</SectionTitle>
      <FormComponent />  
      <MessageList />
    </PageContainer>
  )
}

export default Thoughts 

