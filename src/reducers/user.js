import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? {
    userId: JSON.parse(localStorage.getItem('user')).userId,
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    profileImage: JSON.parse(localStorage.getItem('user')).profileImage,
    friends: JSON.parse(localStorage.getItem('friends')).friends,
    friendRequests: JSON.parse(localStorage.getItem('friendRequests')).friendRequests,
    myFriendRequests: JSON.parse(localStorage.getItem('myFriendRequests')).myFriendRequests,
    errors: null
  }
  : {
    userId: null,
    username: null,
    accessToken:null,
    profileImage: null,
    friends: [],
    friendRequests: [],
    myFriendRequests: [],
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
    setFriends: (store, action) => {
      store.friends = action.payload
    },
    addFriends: (store, action) => {
      const updatedFriends = [action.payload, ...store.friends]
      store.friends = updatedFriends
    },
    removeFriends: (store, action) => {
      const updatedFriends = store.friends.filter(item => item._id !== action.payload)
      store.friends = updatedFriends
    },
    setFriendRequests: (store, action) => {
      store.friendRequests = action.payload
    },
    addFriendRequests: (store, action) => {
      const updatedFriendRequests = [action.payload, ...store.friendRequests]
      store.friendRequests = updatedFriendRequests
    },
    removeFriendRequests: (store, action) => {
      const updatedFriendRequests = store.friendRequests.filter(item => item._id !== action.payload)
      store.friendRequests = updatedFriendRequests
    },
    setMyFriendRequests: (store, action) => {
      store.myFriendRequests = action.payload
    },
    addMyFriendRequests: (store, action) => {
      const updatedmyFriendRequests = [action.payload, ...store.myFriendRequests]
      store.myFriendRequests = updatedmyFriendRequests
    },
    removeMyFriendRequests: (store, action) => {
      const updatedmyFriendRequests = store.myFriendRequests.filter(item => item._id !== action.payload)
      store.myFriendRequests = updatedmyFriendRequests
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user