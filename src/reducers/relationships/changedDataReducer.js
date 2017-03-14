import { handleActions } from 'redux-actions'
import {
  // RELATIONSHIP_RESET,

  // one
  RELATIONSHIP_ONE_SET,
  RELATIONSHIP_ONE_DELETE,

  // many
  // RELATIONSHIP_MANY_SET,
  RELATIONSHIP_MANY_ADD,
  RELATIONSHIP_MANY_DELETE,

  // advanced
  RELATIONSHIP_MANY_CONCAT,
  RELATIONSHIP_MANY_FILTER,
  RELATIONSHIP_MANY_MAP,
  RELATIONSHIP_MANY_PUSH,
  RELATIONSHIP_MANY_REVERSE,
  RELATIONSHIP_MANY_SLICE,
  RELATIONSHIP_MANY_SORT,
  RELATIONSHIP_MANY_SPLICE,
  RELATIONSHIP_MANY_UNSHIFT
} from '../../constants/relationships'
import invariant from 'invariant'

export const either = (state, data) => state.length && state || data

// TODO: rename to createChangedDataReducer
const changedDataReducer = ({ isOne = false, accepts }) => {
  // validate the action
  const isValid = (state, action) => {
    const { payload } = action
    if (!payload) {
      // invariant(false, 'Action must include a payload')
      return false
    }
    const { key } = payload
    if (!key) {
      // invariant(false, 'Payload must include a relationship `key`')
      return false
    }
    return true
  }

  // validate the item
  const canAccept = (item) => {
    if (!accepts) { return true }
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
    // one
    [RELATIONSHIP_ONE_SET]: (state, action) => {
      if (!isOne || !isValid(state, action)) { return state }
      const { payload } = action
      const { data } = payload
      if (!canAccept(data)) { return state }
      return data
    },
    [RELATIONSHIP_ONE_DELETE]: (state, action) => {
      if (!isOne || !isValid(state, action)) { return state }
      return null
    },

    // many
    [RELATIONSHIP_MANY_ADD]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { data } = payload
      const { relationshipData } = meta
      if (!canAccept(data)) { return state }

      const newState = [...either(state, relationshipData)]

      // bail if already added
      if (newState.some(({ id, type }) => id === data.id && type === data.type)) {
        return newState
      }
      return [ ...newState, { type: data.type, id: data.id, meta: data.meta } ]
    },

    [RELATIONSHIP_MANY_DELETE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { data } = payload
      const { relationshipData } = meta
      if (data && !canAccept(data)) { return state }

      // @see RELATIONSHIP_MANY_SPLICE
      const newState = [...either(state, relationshipData)]
      const deleteItem = ({ type, id }) => {
        const index = newState.findIndex(identifier => identifier.type === type && identifier.id === id)
        newState.splice(index, 1)
      }
      if (Array.isArray(data)) {
        data.map(item => deleteItem(item))
      } else if (data) {
        deleteItem(data)
      } else {
        // TODO: remove legacy functionality
        return []
      }
      return newState
    },

    // advanced
    [RELATIONSHIP_MANY_CONCAT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { data } = payload
      const { relationshipData } = meta
      if (!canAccept(data)) { return state }
      return either(state, relationshipData).concat(data)
    },
    [RELATIONSHIP_MANY_FILTER]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { func } = payload
      const { relationshipData } = meta
      return either(state, relationshipData).filter(func)
    },
    [RELATIONSHIP_MANY_MAP]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { func } = payload
      const { relationshipData } = meta
      return either(state, relationshipData).map(func)
    },
    [RELATIONSHIP_MANY_PUSH]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { data } = payload
      const { relationshipData } = meta
      const newState = [...either(state, relationshipData)]
      if (!canAccept(data)) { return state }
      if (!Array.isArray(data)) {
        newState.push(data)
      } else {
        newState.push(...data)
      }
      return newState
    },
    [RELATIONSHIP_MANY_REVERSE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { meta } = action
      const { relationshipData } = meta
      return [ ...either(state, relationshipData) ].reverse()
    },
    [RELATIONSHIP_MANY_SLICE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { options } = payload
      const { begin, end } = options
      const { relationshipData } = meta
      return either(state, relationshipData).slice(begin, end)
    },
    [RELATIONSHIP_MANY_SORT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { func } = payload
      const { relationshipData } = meta
      return [...either(state, relationshipData)].sort(func)
    },
    [RELATIONSHIP_MANY_SPLICE]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { options, data } = payload
      const { start, deleteCount } = options || {}
      const { relationshipData } = meta
      const newState = [...either(state, relationshipData)]
      if (data && !canAccept(data)) { return state }
      if (!Array.isArray(data)) {
        newState.splice(start, deleteCount, data)
      } else {
        newState.splice(start, deleteCount, ...data)
      }
      return newState
    },
    [RELATIONSHIP_MANY_UNSHIFT]: (state, action) => {
      if (isOne || !isValid(state, action)) { return state }
      const { payload, meta } = action
      const { data } = payload
      const { relationshipData } = meta
      const newState = [...either(state, relationshipData)]
      if (!canAccept(data)) { return state }
      if (!Array.isArray(data)) {
        newState.unshift(data)
      } else {
        newState.unshift(...data)
      }
      return newState
    }
  }, isOne ? null : [])
}
export default changedDataReducer
