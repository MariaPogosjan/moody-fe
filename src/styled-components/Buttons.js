import styled from 'styled-components'

export const ButtonsWrapper = styled.div`
  display: flex; 
  justify-content: center;
`

export const Button = styled.button`
  background-color: #404167;
  border: none;
  color: white;
  padding: 1rem 0.8rem;
  margin-top: 1.2rem; 
  border-radius: 6px;
  width: 15rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  
   &:hover {
     opacity: 0.8;
   }
`