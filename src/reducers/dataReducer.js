import { handleActions } from 'redux-actions'
import reduceReducers from 'reduce-reducers'
import { pluralize } from 'inflection'
import itemReducer from './itemReducer'
import {
  ITEM_CREATE_NEW,
  ITEM_ADD
} from '../constants/itemConstants'
import {
  LIST_CONCAT,
  LIST_FILTER,
  LIST_MAP,
  LIST_PUSH,
  LIST_REVERSE,
  LIST_SLICE,
  LIST_SORT,
  LIST_SPLICE,
  LIST_UNSHIFT
} from '../constants/listConstants'

const mapActionToItemReducer = (type, id) => (state, action) => {
  if (type === undefined || id === undefined) { return state }
  const item = state.find(i => i.type === type && i.id === id)
  if (!item) { return state }
  return state.map(i => i === item ? itemReducer(i, action) : i)
}

// TODO: should these alter the real array?
const listReducer = handleActions({
  [ITEM_CREATE_NEW]: (state, action) => {
    // const { payload } = action || {}
    // const { type } = payload
    return [...state, itemReducer(undefined, action)]
  },
  [ITEM_ADD]: (state, action) => {
    const { payload } = action || {}
    const { type, id } = payload
    const item = state.find(i => i.type === type && i.id === id)
    if (item) { return state }
    return [...state, itemReducer(item, action)]
  },
  [LIST_CONCAT]: (state, action) => {
    const { payload } = action || {}
    const { type } = payload
    // TODO: stop using pluralize
    const types = pluralize(type)
    if (payload[type]) {
      return state.concat(payload[type])
    } else if (!payload[type] && payload[types]) {
      return state.concat(...payload[types])
    }
    return state
  },
  [LIST_FILTER]: (state, action) => state.filter(action.payload.filter),
  [LIST_MAP]: (state, action) => state.map(action.payload.map),
  [LIST_PUSH]: (state, action) => {
    const { payload } = action || {}
    const { type } = payload
    const types = pluralize(type)
    const newState = [...state]
    if (payload[type]) {
      newState.push(payload[type])
    } else if (!payload[type] && payload[types]) {
      newState.push(...payload[types])
    } else { return state }
    return newState
  },
  [LIST_REVERSE]: (state, action) => [...state].reverse(),
  [LIST_SLICE]: (state, action) => state.slice(action.payload.begin, action.payload.end),
  [LIST_SORT]: (state, action) => [...state].sort(action.payload.sort),
  [LIST_SPLICE]: (state, action) => {
    const { payload } = action || {}
    const { start, deleteCount, type } = payload
    const types = pluralize(type)
    const newState = [...state]

    if (payload[type]) {
      newState.splice(start, deleteCount, payload[type])
    } else if (!payload[type] && payload[types]) {
      newState.splice(start, deleteCount, ...payload[types])
    } else if (deleteCount !== undefined) {
      newState.splice(start, deleteCount)
    } else { return state }
    return newState
  },
  [LIST_UNSHIFT]: (state, action) => {
    const { payload } = action || {}
    const { type } = payload
    const types = pluralize(type)
    const newState = [...state]

    if (payload[type]) {
      newState.unshift(payload[type])
    } else if (!payload[type] && payload[types]) {
      newState.unshift(...payload[types])
    } else { return state }

    return newState
  }
}, [])

const dataReducer = (type, relationships = []) => (state = [], action) => {
  const { payload } = action || {}
  console.log(action.type, payload && payload.type === type, payload && payload.type, type)
  if (!payload || payload.type !== type) { return state }

  return reduceReducers(
    mapActionToItemReducer(payload.type, payload.id),
    listReducer
  )(state, { ...action, meta: { ...action.meta, type, relationships } })
}

export default dataReducer
