import { combineReducers } from 'redux'
import dataReducer from './dataReducer'

const reducer = (type) => combineReducers({
  data: dataReducer(type),
  meta: (state = {}, action) => state
})

export { dataReducer }
export default reducer
