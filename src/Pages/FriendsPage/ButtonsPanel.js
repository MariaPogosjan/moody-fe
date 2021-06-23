import React from 'react'
import styled from 'styled-components'


const ButtonsPanel = ({ tab, setTab }) => {
  return (
    <ButtonsContainer>
      <TabButtonFriends tab={tab} onClick={() => setTab("friends")}>
        Friends
      </TabButtonFriends>
      <TabButtonRequests tab={tab} onClick={() => setTab("requests")} >
        Friend requests
      </TabButtonRequests>
      <TabButtonSearch tab={tab} onClick={() => setTab("search")} >
        Search
      </TabButtonSearch>
    </ButtonsContainer>
  )
}

export default ButtonsPanel

const ButtonsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  box-shadow: 2px 2px 8px #83a0a07a;
  margin-bottom: 20px;
  padding-left: 5px;
`

const TabButton = styled.div`
  border: none; 
  background: none;
  padding: 10px;
  margin: 20px 5px 0px 0px;
  cursor: pointer;
  color: #4C5F6B;
  font-weight: bolder;

  &:hover {
    background-color: #83A0A0;
    color: #fff
  }
`
const TabButtonFriends = styled(TabButton)`
  border-bottom: ${props => props.tab === "friends" && "2px solid #4C5F6B"};
  color:  ${props => props.tab === "friends" && "#2a363c"};
`
const TabButtonRequests = styled(TabButton)`
  border-bottom: ${props => props.tab === "requests" && "2px solid #4C5F6B"};
  color:  ${props => props.tab === "requests" && "#2a363c"};
`
const TabButtonSearch = styled(TabButton)`
  border-bottom: ${props => props.tab === "search" && "2px solid #4C5F6B"};
  color:  ${props => props.tab === "search" && "#2a363c"};
`