import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

import {
  RELATIONSHIP_RESET,

  // one
  // RELATIONSHIP_ONE_SET,
  RELATIONSHIP_ONE_DELETE,

  // many
  // RELATIONSHIP_MANY_SET,
  // RELATIONSHIP_MANY_ADD,
  RELATIONSHIP_MANY_DELETE

  // middleware
  // RELATIONSHIP_ONE_FETCH,
  // RELATIONSHIP_MANY_FETCH,

  // advanced
  // RELATIONSHIP_MANY_CONCAT,
  // RELATIONSHIP_MANY_FILTER,
  // RELATIONSHIP_MANY_MAP,
  // RELATIONSHIP_MANY_PUSH,
  // RELATIONSHIP_MANY_REVERSE,
  // RELATIONSHIP_MANY_SLICE,
  // RELATIONSHIP_MANY_SORT,
  // RELATIONSHIP_MANY_SPLICE,
  // RELATIONSHIP_MANY_UNSHIFT
} from '../../constants/relationships'
import { ITEM_COMMIT } from '../../constants/item'
import changedDataReducer from './changedDataReducer'

const deleteKey = (state = {}, key) => {
  if (state[key] === undefined) { return state }
  const newState = { ...state }
  delete newState[key]
  return newState
}

const relationshipMetaReducer = (config) => {
  const { isOne } = config
  return reduceReducers(
    // TODO: this throws for unknown keys
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
        const { changedData } = state
        const isDeleted = changedData === null || Array.isArray(changedData) && !changedData.length
        return { ...state, isDeleted }
      },
      [ITEM_COMMIT]: (state, action) => {
        // @see RELATIONSHIP_RESET
        let newState = { ...state }
        newState = deleteKey(newState, 'changedData')
        newState = deleteKey(newState, 'isDeleted')
        return newState
      }
    }, {}),
    (state = {}, action) => {
      // cleanup empty attributes, etc
      const { changedData, isDeleted } = state
      const hasChangedData = !(changedData === null || Array.isArray(changedData) && !changedData.length)
      let newState
      if (!hasChangedData) {
        newState = { ...state }
        newState = deleteKey(newState, 'changedData')
      }
      if (isDeleted === false || isDeleted === true && hasChangedData) {
        newState = newState || { ...state }
        newState = deleteKey(newState, 'isDeleted')
      }
      return newState || state
    }
  )
}
export default relationshipMetaReducer
