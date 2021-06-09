import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? {
    userId: JSON.parse(localStorage.getItem('user')).userId,
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    profileImage: JSON.parse(localStorage.getItem('user')).profileImage,
    errors: null
  }
  : {
    userId: null,
    username: null,
    accessToken:null,
    profileImage: null,
    errors: null
  }

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setProfileImage: (store, action) => {
      store.profileImage = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user