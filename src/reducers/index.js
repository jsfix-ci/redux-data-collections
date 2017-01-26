import { combineReducers } from 'redux'
import dataReducer from './dataReducer'

const reducer = (type, relationships) => combineReducers({
  data: dataReducer(type, relationships),

  // TODO: manage meta for the whole collection
  meta: (state = {}, action) => state
})

export { dataReducer }
export default reducer
