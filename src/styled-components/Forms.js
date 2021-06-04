import styled from 'styled-components'

export const FormSection = styled.section`
  height: auto;
  min-height: 100vh;
`

export const Form = styled.form `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`

export const Label = styled.label`
 display: none;
`

export const Input = styled.input`
  padding: 10px 5px;
  margin: 10px 0 5px 0;
  width: 200px;
  border: 1px solid #BCA0BC;
  border-radius: 6px;

  &::placeholder {
    color: #4C5F6B;  
  } 
`
