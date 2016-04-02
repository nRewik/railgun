import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import agents from './agents'

export default combineReducers({
  agents,
  routing: routerReducer
})
