import React, {useState} from 'react'
import styled from 'styled-components'
import { SectionTitle } from 'styled-components/Titels'

import FormComponent from './FormComponent'
import MessageList from './MessageList'

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

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  margin-top: 2rem;
`