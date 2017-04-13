import { combineReducers } from 'redux'
import setsDataReducer from './setsDataReducer'
import setsMetaReducer from './setsMetaReducer'
import { selectKey, selectOptions } from '../../selectors/action'
import { makeSetKey } from '../../utils/makeSetKey'

// set page reducer
const setPageReducer = combineReducers({
  data: setsDataReducer,
  meta: setsMetaReducer
})

const makePageNum = action => {
  const options = selectOptions(action)
  let page = '1'
  if (options && options.page) { page = `${options.page}` }
  return page
}

// set reducer
const setReducer = (state = {}, action) => {
  const page = makePageNum(action)
  return { ...state, [page]: setPageReducer(state[page], action) }
}

export const makeSetKeyFromAction = action => {
  const key = selectKey(action)
  const options = selectOptions(action)
  return makeSetKey(key, options)
}

// sets reducer
const setsReducer = (state = {}, action) => {
  const key = makeSetKeyFromAction(action)
  return { ...state, [key]: setReducer(state[key], action) }
}

export default setsReducer
