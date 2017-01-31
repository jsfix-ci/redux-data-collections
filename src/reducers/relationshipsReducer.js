import { combineReducers } from 'redux'
import relationshipDataReducer from './relationshipDataReducer'
import relationshipMetaReducer from './relationshipMetaReducer'

const relationshipReducer = (config) => {
  const reducer = combineReducers({
    data: relationshipDataReducer(config),
    meta: relationshipMetaReducer(config)
  })

  return (state = {}, action) => {
    if (!action.meta) { return state }

    // alter the action before passing to reducer
    const newAction = {
      ...action,
      meta: {
        ...action.meta,
        relationshipData: state.data
      }
    }
    return reducer(state, newAction)
  }
}

// NOTE: relationships = [{ key = 'comments', isOne = false, accepts = ['comment'] }]
const relationshipsReducer = (options = {}) => (state = {}, action) => {
  const { relationships } = options
  if (!relationships) { return state }
  const keys = Object.keys(relationships)
  if (!keys.length) { return state }

  const reducers = {}

  keys.reduce((_, key) => {
    const config = relationships[key]
    reducers[key] = relationshipReducer(config)
  }, reducers)

  return combineReducers(reducers)(state, action)
}
export default relationshipsReducer
