import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import metaReducer from './metaReducer'

const relationshipReducer = config => {
  const reducer = combineReducers({
    data: dataReducer(config),
    meta: metaReducer(config)
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

export default relationshipReducer
