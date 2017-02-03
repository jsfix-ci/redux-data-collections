import { combineReducers } from 'redux'
import setsDataReducer from './setsDataReducer'
import setsMetaReducer from './setsMetaReducer'
import { selectKey } from '../../selectors/actionSelectors'

const setReducer = combineReducers({
  data: setsDataReducer,
  meta: setsMetaReducer
})

const setsReducer = (state = {}, action) => {
  const key = selectKey(action)
  return { ...state, [key]: setReducer(state[key], action) }
}

export default setsReducer
