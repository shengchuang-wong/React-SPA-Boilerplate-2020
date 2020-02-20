import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ScooterPlotter from './pages/ScooterPlotter/ScooterPlotter'
import NotFound from './pages/NotFound/NotFound'

import './App.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ScooterPlotter} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
