import { handleActions } from 'redux-actions'
import {
  REDUX_DATA_RELATIONSHIP_ONE_SET,
  REDUX_DATA_RELATIONSHIP_ONE_DELETE,
  REDUX_DATA_RELATIONSHIP_MANY_DELETE,
  REDUX_DATA_RELATIONSHIP_MANY_CONCAT,
  REDUX_DATA_RELATIONSHIP_MANY_FILTER,
  REDUX_DATA_RELATIONSHIP_MANY_MAP,
  REDUX_DATA_RELATIONSHIP_MANY_PUSH,
  REDUX_DATA_RELATIONSHIP_MANY_REVERSE,
  REDUX_DATA_RELATIONSHIP_MANY_SLICE,
  REDUX_DATA_RELATIONSHIP_MANY_SORT,
  REDUX_DATA_RELATIONSHIP_MANY_SPLICE,
  REDUX_DATA_RELATIONSHIP_MANY_UNSHIFT
} from '../constants/relationshipConstants'

const changedDataReducer = ({ key, isOne, accepts }) => {
  const isValid = (state, action) => {
    const { payload } = action
    if (!payload) { return false }
    const { relationship } = payload
    if (!relationship) { return false }
    if (key !== relationship) { return false }
    return true
  }
  return handleActions({
    [REDUX_DATA_RELATIONSHIP_ONE_SET]: (state, action) => {
      if (!isOne || !isValid(state, action)) { return state }
      const { payload } = action
      const { relationship } = payload
      const data = payload[relationship]
      if (!data) { return state }
      if (!accepts.includes(data.type)) { return state }
      return data
    },
    [REDUX_DATA_RELATIONSHIP_ONE_DELETE]: (state, action) => {
      if (!isOne || !isValid(state, action)) { return state }
      return null
    },
    [REDUX_DATA_RELATIONSHIP_MANY_DELETE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return []
    },
    [REDUX_DATA_RELATIONSHIP_MANY_CONCAT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { relationship } = payload
      const data = meta.relationshipData
      const newData = payload[relationship]
      if (!newData) { return state }

      // TODO: if (!accepts.includes(data.type)) { return state }

      return state.length ? state.concat(newData) : state.concat(data, newData)
    },
    [REDUX_DATA_RELATIONSHIP_MANY_FILTER]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { filter } = payload
      const data = meta.relationshipData
      return (state.length && state || data).filter(filter)
    },
    [REDUX_DATA_RELATIONSHIP_MANY_MAP]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return state
    },
    [REDUX_DATA_RELATIONSHIP_MANY_PUSH]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return state
    },
    [REDUX_DATA_RELATIONSHIP_MANY_REVERSE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return state
    },
    [REDUX_DATA_RELATIONSHIP_MANY_SLICE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return state
    },
    [REDUX_DATA_RELATIONSHIP_MANY_SORT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return state
    },
    [REDUX_DATA_RELATIONSHIP_MANY_SPLICE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return state
    },
    [REDUX_DATA_RELATIONSHIP_MANY_UNSHIFT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return state
    }
  }, isOne ? null : [])
}
export default changedDataReducer
