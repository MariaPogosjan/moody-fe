import React from 'react'

const FormComponent = () => {
  

 return (
  <form  >
  <p>What's making you happy right now?</p>
  <label >
    <input
      id="newMessage" 
      type="text" 
    />
  </label>
  <button 
    type="submit"
  >
    Send
  </button> 
</form>
 )
}
export default FormComponent