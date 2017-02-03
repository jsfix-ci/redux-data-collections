import { combineReducers } from 'redux'
import dataReducer from './collection/dataReducer'
import metaReducer from './collection/metaReducer'

const reducer = (type, options) => combineReducers({
  data: dataReducer(type, options),
  meta: metaReducer(type, options)
})

export { dataReducer, metaReducer }
export default reducer
