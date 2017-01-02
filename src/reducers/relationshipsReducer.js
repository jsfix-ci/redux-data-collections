import { combineReducers } from 'redux'
import relationshipDataReducer from './relationshipDataReducer'
import relationshipMetaReducer from './relationshipMetaReducer'

const relationshipReducer = (config) => {
  const { key } = config
  const reducer = combineReducers({
    data: relationshipDataReducer(config),
    meta: relationshipMetaReducer(config)
  })
  return (state = {}, action) => {
    const { payload } = action
    if (!payload) { return state }
    const { relationship } = payload
    if (!relationship) { return state }
    if (key !== relationship) { return state }
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
const relationshipsReducer = (relationships = []) => (state = {}, action) => {
  if (!action.payload) { return state }
  const reducers = {}
  relationships.reduce((_, config) => {
    reducers[config.key] = relationshipReducer(config)
  }, reducers)
  return relationships.length ? combineReducers(reducers)(state, action) : state
}
export default relationshipsReducer
