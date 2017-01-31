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
  let newState

  // immutable find and splice
  // @see http://vincent.billey.me/pure-javascript-immutable-array
  state.some((item, i) => {
    if (item.type === type && item.id === id) {
      newState = [ ...state.slice(0, i), itemReducer(item, action), ...state.slice(i) ]
    }
    return false
  })

  if (newState) { return newState }
  return state
}

// NOTE: on the `data` list we're not tracking changes
const listReducer = handleActions({
  [ITEM_CREATE_NEW]: (state, action) => {
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
    const { data } = payload

    if (data) {
      return state.concat(data)
    }
    return state
  },
  [LIST_FILTER]: (state, action) => state.filter(action.payload.func),
  [LIST_MAP]: (state, action) => state.map(action.payload.func),
  [LIST_PUSH]: (state, action) => {
    const { payload } = action || {}
    const { data } = payload
    let newState

    if (data) {
      newState = [...state]
    } else { return state }

    if (Array.isArray(data)) {
      newState.push(...data)
    } else {
      newState.push(data)
    }
    return newState
  },
  [LIST_REVERSE]: (state, action) => [...state].reverse(),
  [LIST_SLICE]: (state, action) => state.slice(action.payload.options.begin, action.payload.options.end),
  [LIST_SORT]: (state, action) => [...state].sort(action.payload.func),
  [LIST_SPLICE]: (state, action) => {
    const { payload } = action || {}
    const { options, data } = payload
    const { start, deleteCount } = options || {}
    let newState

    if (data || start !== undefined && deleteCount !== undefined) {
      newState = [...state]
    } else { return state }

    if (Array.isArray(data)) {
      newState.splice(start, deleteCount, ...data)
    } else if (data !== undefined) {
      newState.splice(start, deleteCount, data)
    } else {
      newState.splice(start, deleteCount)
    }
    return newState
  },
  [LIST_UNSHIFT]: (state, action) => {
    const { payload } = action || {}
    const { data } = payload
    const newState = [...state]

    if (data) {
      Array.isArray(data) ? newState.unshift(...data) : newState.unshift(data)
    } else { return state }

    return newState
  }
}, [])

const dataReducer = (type, options = {}) => (state = [], action) => {
  const { meta } = action || {}

  if (!meta || meta.type !== type) { return state }

  return reduceReducers(
    mapActionToItemReducer(meta.type, meta.id),
    listReducer
  )(state, { ...action, meta: { ...action.meta, options } })
}

export default dataReducer
