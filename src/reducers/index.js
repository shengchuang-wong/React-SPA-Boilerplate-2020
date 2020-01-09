import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const reducers = {}

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ...reducers
  })

export default rootReducer
