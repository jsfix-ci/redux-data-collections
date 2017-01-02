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
import invariant from 'invariant'

const changedDataReducer = ({ key, isOne, accepts }) => {
  const isValid = (state, action) => {
    const { payload } = action
    if (!payload) {
      invariant(false, 'Action must include a payload')
      return false
    }
    const { relationship } = payload
    if (!relationship) {
      invariant(false, 'Payload must include a relationship')
      return false
    }
    if (key !== relationship) {
      invariant(false, `Relationship must be ${key}, instead it is ${relationship}`)
      return false
    }
    return true
  }
  const canAccept = (item) => {
    let isAccepted = true
    if (!Array.isArray(item)) {
      isAccepted = accepts.includes(item.type)
      invariant(isAccepted, `Cannot accept type of ${item.type}, must be one of ${accepts.join(', ')}`)
    } else {
      isAccepted = item.every(({ type }) => accepts.includes(type))
      invariant(isAccepted, `Cannot accept type of ${
        item
          .filter(({ type }) => !accepts.includes(type))
          .join(', ')
      }, must be one of ${accepts.join(', ')}`)
    }
    return isAccepted
  }
  return handleActions({
    [REDUX_DATA_RELATIONSHIP_ONE_SET]: (state, action) => {
      if (!isOne || !isValid(state, action)) { return state }
      const { payload } = action
      const { relationship } = payload
      const item = payload[relationship]
      if (!canAccept(item)) { return state }
      return item
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
      const item = payload[relationship]
      if (!canAccept(item)) { return state }
      return (state.length && state || data).concat(item)
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
      const { payload, meta } = action
      const { map } = payload
      const data = meta.relationshipData
      return (state.length && state || data).map(map)
    },
    [REDUX_DATA_RELATIONSHIP_MANY_PUSH]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { relationship } = payload
      const data = meta.relationshipData
      const newState = [...(state.length && state || data)]
      const item = payload[relationship]
      if (!canAccept(item)) { return state }
      if (!Array.isArray(item)) {
        newState.push(item)
      } else {
        newState.push(...item)
      }
      return newState
    },
    [REDUX_DATA_RELATIONSHIP_MANY_REVERSE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { meta } = action
      const data = meta.relationshipData
      return [ ...(state.length && state || data) ].reverse()
    },
    [REDUX_DATA_RELATIONSHIP_MANY_SLICE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { begin, end } = payload
      const data = meta.relationshipData
      return (state.length && state || data).slice(begin, end)
    },
    [REDUX_DATA_RELATIONSHIP_MANY_SORT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { sort } = payload
      const data = meta.relationshipData
      return [...(state.length && state || data)].sort(sort)
    },
    [REDUX_DATA_RELATIONSHIP_MANY_SPLICE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { start, deleteCount, relationship } = payload
      const data = meta.relationshipData
      const newState = [...(state.length && state || data)]
      const item = payload[relationship]
      if (item && !canAccept(item)) { return state }
      if (!Array.isArray(item)) {
        newState.splice(start, deleteCount, item)
      } else {
        newState.splice(start, deleteCount, ...item)
      }
      return newState
    },
    [REDUX_DATA_RELATIONSHIP_MANY_UNSHIFT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { relationship } = payload
      const data = meta.relationshipData
      const newState = [...(state.length && state || data)]
      const item = payload[relationship]
      if (!canAccept(item)) { return state }
      if (!Array.isArray(item)) {
        newState.unshift(item)
      } else {
        newState.unshift(...item)
      }
      return newState
    }
  }, isOne ? null : [])
}
export default changedDataReducer
