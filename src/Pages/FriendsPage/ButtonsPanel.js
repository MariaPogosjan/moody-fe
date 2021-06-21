import React from 'react'
import styled from 'styled-components'

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
  color: #404167;
  font-weight: bolder;

  &:hover {
    background-color: #EEECFB;
  }
`
const TabButtonFriends = styled(TabButton)`
  border-bottom: ${props => props.tab === "friends" && "2px solid #bca0bc"};
  color:  ${props => props.tab === "friends" && "#613e61"};
`
const TabButtonRequests = styled(TabButton)`
  border-bottom: ${props => props.tab === "requests" && "2px solid #bca0bc"};
  color:  ${props => props.tab === "requests" && "#613e61"};
`
const TabButtonSearch = styled(TabButton)`
  border-bottom: ${props => props.tab === "search" && "2px solid #bca0bc"};
  color:  ${props => props.tab === "search" && "#613e61"};
`


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