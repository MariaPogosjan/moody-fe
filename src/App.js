import React from 'react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import user from './reducers/user'
import feeling from './reducers/feeling'

import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Home from 'Pages/HomePage/index.js'
import SignUp from 'Pages/Signup'
import Login from 'Pages/LoginPage'
import Profile from 'Pages/ProfilePage'
import SummaryPage from 'Pages/SummaryPage'
import About from 'Pages/AboutPage'


const reducer = combineReducers({
  user: user.reducer,
  feeling: feeling.reducer
})
const store = configureStore({ reducer })

const App = () => {
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
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  )
}

export default App;
