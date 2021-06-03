import React from 'react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import user from './reducers/user'

import Home from './Pages/HomePage/Home.js'
import Header from './components/Header'


const reducer = combineReducers({
  user: user.reducer
})
const store = configureStore({ reducer })

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
