import { combineReducers } from 'redux'
import setsDataReducer from './setsDataReducer'
import setsMetaReducer from './setsMetaReducer'
import { selectKey, selectOptions } from '../../selectors/action'

const setPageReducer = combineReducers({
  data: setsDataReducer,
  meta: setsMetaReducer
})

const setReducer = (state = {}, action) => {
  const options = selectOptions(action)
  let page = '1'
  if (options && options.page) { page = `${options.page}` }
  return { ...state, [page]: setPageReducer(state[page], action) }
}

const setsReducer = (state = {}, action) => {
  let key = selectKey(action)
  return { ...state, [key]: setReducer(state[key], action) }
}

export default setsReducer
