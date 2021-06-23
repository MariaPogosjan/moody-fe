import styled from 'styled-components'

export const FormSection = styled.section`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
  @media (min-width: 768px) {
    height: 65vh;
  }
`

export const Form = styled.form `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Label = styled.label`
 display: none;
 color: red;
`

export const VisibleLabel = styled.label`
 font-size: 1.4rem;
 color: #4C5F6B;
`

export const Input = styled.input`
  padding: 1rem 0.5rem;
  margin: 1rem 0 0.5rem 0;
  width: 70%;
  border: 1px solid #BCA0BC;
  border-radius: 0.4rem;

  &::placeholder {
    color: #4C5F6B;  
  } 

  @media (min-width: 768px) {
    width: 60%;
    margin: 1rem 0 0.5rem 0;
    width: 80%;
  }
`

export const ErrorMessage = styled.p`
  background-color: rgba(234, 161, 161, 0.318);
  padding: 1rem 0.5rem;
  text-align: center;
  width: 80%;
  font-size: 1rem;
  border-radius: 0.4rem;
  color: #626365;

  @media (min-width: 768px) {
    width: 60%;
  }
`

