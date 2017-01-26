import { handleActions } from 'redux-actions'
import {
  RELATIONSHIP_ONE_SET,
  RELATIONSHIP_ONE_DELETE,
  RELATIONSHIP_MANY_DELETE,
  RELATIONSHIP_MANY_CONCAT,
  RELATIONSHIP_MANY_FILTER,
  RELATIONSHIP_MANY_MAP,
  RELATIONSHIP_MANY_PUSH,
  RELATIONSHIP_MANY_REVERSE,
  RELATIONSHIP_MANY_SLICE,
  RELATIONSHIP_MANY_SORT,
  RELATIONSHIP_MANY_SPLICE,
  RELATIONSHIP_MANY_UNSHIFT
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
    [RELATIONSHIP_ONE_SET]: (state, action) => {
      if (!isOne || !isValid(state, action)) { return state }
      const { payload } = action
      const { relationship } = payload
      const item = payload[relationship]
      if (!canAccept(item)) { return state }
      return item
    },
    [RELATIONSHIP_ONE_DELETE]: (state, action) => {
      if (!isOne || !isValid(state, action)) { return state }
      return null
    },
    [RELATIONSHIP_MANY_DELETE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      return []
    },
    [RELATIONSHIP_MANY_CONCAT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { relationship } = payload
      const data = meta.relationshipData
      const item = payload[relationship]
      if (!canAccept(item)) { return state }
      return (state.length && state || data).concat(item)
    },
    [RELATIONSHIP_MANY_FILTER]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { filter } = payload
      const data = meta.relationshipData
      return (state.length && state || data).filter(filter)
    },
    [RELATIONSHIP_MANY_MAP]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { map } = payload
      const data = meta.relationshipData
      return (state.length && state || data).map(map)
    },
    [RELATIONSHIP_MANY_PUSH]: (state, action) => {
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
    [RELATIONSHIP_MANY_REVERSE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { meta } = action
      const data = meta.relationshipData
      return [ ...(state.length && state || data) ].reverse()
    },
    [RELATIONSHIP_MANY_SLICE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { begin, end } = payload
      const data = meta.relationshipData
      return (state.length && state || data).slice(begin, end)
    },
    [RELATIONSHIP_MANY_SORT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { sort } = payload
      const data = meta.relationshipData
      return [...(state.length && state || data)].sort(sort)
    },
    [RELATIONSHIP_MANY_SPLICE]: (state, action) => {
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
    [RELATIONSHIP_MANY_UNSHIFT]: (state, action) => {
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
