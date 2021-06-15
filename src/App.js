import React, { useEffect } from 'react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import socketIOClient from "socket.io-client"

import user from './reducers/user'
import feeling from './reducers/feeling'
import friends from 'reducers/friends'

import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Home from 'Pages/HomePage/index.js'
import SignUp from 'Pages/Signup'
import Login from 'Pages/LoginPage'
import Profile from 'Pages/ProfilePage'
import SummaryPage from 'Pages/SummaryPage'
import About from 'Pages/AboutPage'
import Settings from 'Pages/SettingsPage'
import FriendsPage from 'Pages/FriendsPage'

//const ENDPOINT = "http://127.0.0.1:8080"

const reducer = combineReducers({
  user: user.reducer,
  feeling: feeling.reducer,
  friends: friends.reducer
})
const store = configureStore({ reducer })

const App = () => {

  /* useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("FromAPI", data => {
      console.log(data)
    })
  }, []) */
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/about' exact>
            <About />
          </Route>
          <Route path='/signup' exact>
            <SignUp />
          </Route>
          <Route path='/signin' exact>
            <Login />
          </Route>
          <Route path='/profile' exact>
            <Profile />
          </Route>
          <Route path='/summary' exact>
            <SummaryPage />
          </Route>
          <Route path='/settings' exact>
            <Settings />
          </Route>
          <Route path='/friends' exact>
            <FriendsPage />
          </Route>
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  )
}

export default App;
