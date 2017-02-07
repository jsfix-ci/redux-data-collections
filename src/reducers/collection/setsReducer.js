import { combineReducers } from 'redux'
import setsDataReducer from './setsDataReducer'
import setsMetaReducer from './setsMetaReducer'
import { selectKey, selectOptions } from '../../selectors/actionSelectors'

const setReducer = combineReducers({
  data: setsDataReducer,
  meta: setsMetaReducer
})

const setsReducer = (state = {}, action) => {
  let key = selectKey(action)
  const options = selectOptions(action)
  if (options && options.page) { key = `${key}:${options.page}` }
  return { ...state, [key]: setReducer(state[key], action) }
}

export default setsReducer
