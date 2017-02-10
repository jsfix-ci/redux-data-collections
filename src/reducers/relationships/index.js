import { combineReducers } from 'redux'
import relationshipReducer from './relationshipReducer'

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
