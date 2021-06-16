import { createSlice } from '@reduxjs/toolkit'

const thoughts = createSlice({
  name: 'thoughts',
  initialState: {
    thoughts: [],
    errors: null
  }, 
  reducers: {
    setThoughts: (store, action) => {
      store.thoughts = action.payload  
    },
    setErrors: (store, action) => {
      store.errors= action.payload  
    }
  }
})

export default thoughts 