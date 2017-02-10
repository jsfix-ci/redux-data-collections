import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import metaReducer from './metaReducer'

const collectionReducer = (type, options) => combineReducers({
  data: dataReducer(type, options),
  meta: metaReducer(type, options)
})

export default collectionReducer
