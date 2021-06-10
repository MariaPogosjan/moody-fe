import styled from 'styled-components'

export const FormSection = styled.section`
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
export const VisibleLabel = styled.label`
 font-size: 14px;
 color: #4C5F6B;
`

export const Input = styled.input`
  padding: 10px 5px;
  margin: 10px 0 5px 0;
  width: 50%;
  border: 1px solid #BCA0BC;
  border-radius: 6px;

  &::placeholder {
    color: #4C5F6B;  
  } 
`

export const ErrorMessage = styled.p`
  background-color: rgba(234, 161, 161, 0.318);
  padding: 10px 5px;
  text-align: center;
  width: 50%;
  font-size: 14px;
  border-radius: 7px;
  color: #626365;
`

