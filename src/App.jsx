import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing/Landing'
import Example from './pages/Example/Example'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={Landing}
        />
        <Route
          exact
          path="/example"
          component={Example}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App