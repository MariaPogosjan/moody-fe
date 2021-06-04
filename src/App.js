import React from 'react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import user from './reducers/user'

import Navbar from 'components/Navbar'
import Home from 'Pages/HomePage/index.js'
import SignUp from 'Pages/Signup'

const reducer = combineReducers({
  user: user.reducer
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
          <Route path='/signup' exact>
            <SignUp />
          </Route>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
