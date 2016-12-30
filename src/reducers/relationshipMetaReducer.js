import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

import {
  REDUX_DATA_RELATIONSHIP_RESET,
  // REDUX_DATA_RELATIONSHIP_ONE_SET,
  REDUX_DATA_RELATIONSHIP_ONE_DELETE,
  REDUX_DATA_RELATIONSHIP_MANY_DELETE
  // REDUX_DATA_RELATIONSHIP_MANY_CONCAT,
  // REDUX_DATA_RELATIONSHIP_MANY_FILTER,
  // REDUX_DATA_RELATIONSHIP_MANY_MAP,
  // REDUX_DATA_RELATIONSHIP_MANY_PUSH,
  // REDUX_DATA_RELATIONSHIP_MANY_REVERSE,
  // REDUX_DATA_RELATIONSHIP_MANY_SLICE,
  // REDUX_DATA_RELATIONSHIP_MANY_SORT,
  // REDUX_DATA_RELATIONSHIP_MANY_SPLICE,
  // REDUX_DATA_RELATIONSHIP_MANY_UNSHIFT
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
      [REDUX_DATA_RELATIONSHIP_RESET]: (state, action) => {
        let newState = { ...state }
        newState = deleteKey(newState, 'changedData')
        newState = deleteKey(newState, 'isDeleted')
        return newState
      },
      [REDUX_DATA_RELATIONSHIP_ONE_DELETE]: (state, action) => {
        if (!isOne) { return state }
        return { ...state, isDeleted: true }
      },
      [REDUX_DATA_RELATIONSHIP_MANY_DELETE]: (state, action) => {
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
