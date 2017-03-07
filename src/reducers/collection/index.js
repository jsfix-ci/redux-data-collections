import { combineReducers } from 'redux'
import createDataReducer from './dataReducer'
import createMetaReducer from './metaReducer'

const collectionReducer = (type, options) => combineReducers({
  data: createDataReducer(type, options),
  meta: createMetaReducer(type, options)
})

export default collectionReducer
