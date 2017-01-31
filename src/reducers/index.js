import { combineReducers } from 'redux'
import dataReducer from './dataReducer'

const reducer = (type, options) => combineReducers({
  data: dataReducer(type, options),

  // TODO: manage meta for the whole collection
  meta: (state = {}, action) => state
})

export { dataReducer }
export default reducer
