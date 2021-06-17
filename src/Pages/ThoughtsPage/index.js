import React, {useState} from 'react'
import styled from 'styled-components'

import FormComponent from './FormComponent'
import MessageList from './MessageList'

const SectionTitle = styled.h1`
  color: #4C5F6B;
  font-size: 25px;
  padding: 5px;
`
const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`

const Thoughts = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
 
  return (
    <PageContainer>
      <SectionTitle>Community</SectionTitle>
      <FormComponent page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} />
      <MessageList page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage}/>
    </PageContainer>
  )
}

export default Thoughts

