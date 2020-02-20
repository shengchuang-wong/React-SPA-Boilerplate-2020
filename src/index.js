import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import reducers from './reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import rootSaga from './sagas'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
  process.env.NODE_ENV === 'development' && logger,
  routerMiddleware(history)
].filter(Boolean)

const store = createStore(
  reducers(history),
  {},
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  // @TODO: to add ErrorBoundary Here
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
