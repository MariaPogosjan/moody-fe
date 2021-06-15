import { createSlice } from '@reduxjs/toolkit'

const friends = createSlice({
  name: "friends",
  initialState: {
    friends: [], 
    errors: null
  },
  reducers: {
    setFriends: (store, action) => {
      store.friends = action.payload  
    },
    setErrors: (store, action) => {
      store.errors= action.payload  
    }
  }
})

export default friends