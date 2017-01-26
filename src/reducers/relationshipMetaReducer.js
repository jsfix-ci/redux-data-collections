import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

import {
  RELATIONSHIP_RESET,
  // RELATIONSHIP_ONE_SET,
  RELATIONSHIP_ONE_DELETE,
  RELATIONSHIP_MANY_DELETE
  // RELATIONSHIP_MANY_CONCAT,
  // RELATIONSHIP_MANY_FILTER,
  // RELATIONSHIP_MANY_MAP,
  // RELATIONSHIP_MANY_PUSH,
  // RELATIONSHIP_MANY_REVERSE,
  // RELATIONSHIP_MANY_SLICE,
  // RELATIONSHIP_MANY_SORT,
  // RELATIONSHIP_MANY_SPLICE,
  // RELATIONSHIP_MANY_UNSHIFT
} from '../constants/relationshipConstants'

import changedDataReducer from './changedDataReducer'

const deleteKey = (state = {}, key) => {
  if (state[key] !== undefined) {
    const newState = { ...state }
    delete newState[key]
    return newState
  }
  return state
}

const relationshipMetaReducer = (config) => {
  const { isOne } = config
  const reducers = reduceReducers(
    combineReducers({
      changedData: changedDataReducer(config),
      isDeleted: (state = false) => state
    }),
    handleActions({
      [RELATIONSHIP_RESET]: (state, action) => {
        let newState = { ...state }
        newState = deleteKey(newState, 'changedData')
        newState = deleteKey(newState, 'isDeleted')
        return newState
      },
      [RELATIONSHIP_ONE_DELETE]: (state, action) => {
        if (!isOne) { return state }
        return { ...state, isDeleted: true }
      },
      [RELATIONSHIP_MANY_DELETE]: (state, action) => {
        if (isOne) { return state }
        return { ...state, isDeleted: true }
      }
    }, {}),
    (state, action) => {
      // cleanup empty attributes, etc
      const { changedData, isDeleted } = state
      let newState = { ...state }
      if (changedData === null || Array.isArray(state.changedData) && !state.changedData.length) {
        newState = deleteKey(newState, 'changedData')
      }
      if (isDeleted === false) {
        newState = deleteKey(newState, 'isDeleted')
      }
      return newState
    }
  )
  return (state, action) => {
    // TODO: bail on empty actions, etc.
    return reducers(state, action)
  }
}
export default relationshipMetaReducer
