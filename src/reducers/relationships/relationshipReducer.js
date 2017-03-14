import { combineReducers } from 'redux'
import createDataReducer from './dataReducer'
import createMetaReducer from './metaReducer'
import get from 'lodash.get'

const createRelationshipReducer = config => {
  const reducer = combineReducers({
    data: createDataReducer(config),
    meta: createMetaReducer(config)
  })

  return (state = {}, action) => {
    if (!action.meta) { return state }

    // alter the action before passing to reducer
    const newAction = {
      ...action,
      meta: {
        ...action.meta,
        relationshipData: state.data, // for changedData
        changedData: get(state, 'meta.changedData'), // for save
        isDeleted: get(state, 'meta.isDeleted') // for save
      }
    }
    return reducer(state, newAction)
  }
}

export default createRelationshipReducer
