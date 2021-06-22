import React, {useState} from 'react'
import styled from 'styled-components'

import FormComponent from './FormComponent'
import MessageList from './MessageList'
import { SectionTitle } from 'styled-components/Titels'

const Thoughts = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
 
  return (
    <PageContainer>
      <SectionTitle>Share your thoughts</SectionTitle>
      <FormComponent page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} />
      <MessageList page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage}/>
    </PageContainer>
  )
}

export default Thoughts


const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem 6rem 5rem 6rem;
`