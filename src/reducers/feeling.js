import { createSlice } from '@reduxjs/toolkit'

const feeling = createSlice({
  name: "feeling",
  initialState: {
    feelings: [], 
    errors: null
  },
  reducers: {
    setFeelings: (store, action) => {
      store.feelings = action.payload  
    },
    setErrors: (store, action) => {
      store.errors= action.payload  
    }
  }
})

export default feeling