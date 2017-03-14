import { combineReducers } from 'redux'
import relationshipReducer from './relationshipReducer'

// NOTE: relationships = { comments: { isOne = false, accepts = ['comment'] } }
const createRelationshipsReducer = (options = {}) => (state = {}, action) => {
  const { relationships } = options
  if (!relationships) { return state } // TODO: shoudn't completely bail on missing relationships config
  const keys = Object.keys(relationships)
  if (!keys.length) { return state }  // TODO: shoudn't completely bail when no keys

  const reducers = {}

  keys.reduce((_, key) => {
    const config = { key, ...relationships[key] }
    reducers[key] = relationshipReducer(config)
  }, reducers)

  // TODO: combineReducers throws invariant errors
  return combineReducers(reducers)(state, action)
}
export default createRelationshipsReducer
