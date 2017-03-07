import { handleActions } from 'redux-actions'
import get from 'lodash.get'
import reduceReducers from 'reduce-reducers'
import itemReducer from '../item'
import {
  ITEM_CREATE_NEW,
  ITEM_ADD,
  ITEM_LOAD
} from '../../constants/item'
import {
  COLLECTION_LOAD_ITEMS,
  COLLECTION_ADD_ITEMS,

  // all
  COLLECTION_SET_ALL_META,
  COLLECTION_DELETE_ALL_META,

  // advanced
  COLLECTION_CONCAT,
  COLLECTION_FILTER,
  COLLECTION_MAP,
  COLLECTION_PUSH,
  COLLECTION_REVERSE,
  COLLECTION_SLICE,
  COLLECTION_SORT,
  COLLECTION_SPLICE,
  COLLECTION_UNSHIFT
} from '../../constants/collection'
import { addItem, updateItem, setMetaKey, deleteMetaKey } from '../../actions/item'
import { selectType, selectId, selectData, selectKey, selectValue } from '../../selectors/action'

// routes actions to items using action.meta.id
const mapActionToItemReducer = (type, id) => (state, action) => {
  if (type === undefined || id === undefined) { return state }
  let newState

  // immutable find and splice
  // @see http://vincent.billey.me/pure-javascript-immutable-array
  state.forEach((item, i) => {
    // TODO: should also match type, but sometimes collection type is plural and item type is singular
    if (item.id === id) {
      newState = [ ...state.slice(0, i), itemReducer(item, action), ...state.slice(i + 1) ]
    }
    return false
  })

  if (newState) { return newState }
  return state
}

// NOTE: on the collection `data` we're not tracking changes
const dataReducer = handleActions({
  [ITEM_CREATE_NEW]: (state, action) => {
    return [...state, itemReducer(undefined, action)]
  },
  [ITEM_ADD]: (state, action) => {
    const type = selectType(action)
    const id = selectId(action)
    const item = state.find(i => i.type === type && i.id === id)
    // TODO: shouldn't we update instead of bailing?
    // TODO: use immutable splice to update
    // TODO: would/should an existing item already be handeled by mapActionToItemReducer?
    if (item) { return state } // <-- already added, bail
    return [...state, itemReducer(item, action)]
  },
  [ITEM_LOAD]: (state, action) => {
    action = { ...action }
    action.type = ITEM_ADD
    return dataReducer(state, action)
  },
  [COLLECTION_LOAD_ITEMS]: (state, action) => {
    action = { ...action }
    action.type = COLLECTION_ADD_ITEMS
    return dataReducer(state, action)
  },
  [COLLECTION_ADD_ITEMS]: (state, action) => {
    const type = selectType(action)
    const data = selectData(action)
    if (!data.length) { return state } // bail if empty
    const newItems = []
    const existingItems = {}
    data.forEach(item => {
      const exists = state.some(it => it.id === item.id)
      if (!exists) {
        newItems.push(item)
      } else {
        existingItems[item.id] = item
      }
    })

    return [
      ...state.map(it => { // <-- update existing items in place
        const newData = existingItems[it.id]
        if (newData) {
          const newAction = updateItem({ type, id: newData.id, data: newData })
          return itemReducer(it, newAction)
        }
        return it
      }),
      ...newItems.map(it => {
        const newAction = addItem({ type, id: it.id, data: it })
        return itemReducer(undefined, newAction)
      })
    ]
  },
  [COLLECTION_SET_ALL_META]: (state, action) => {
    const type = selectType(action)
    const key = selectKey(action)
    const value = selectValue(action)
    return state.map(item => {
      const newAction = setMetaKey({ type, id: item.id, key, value })
      return itemReducer(item, newAction)
    })
  },
  [COLLECTION_DELETE_ALL_META]: (state, action) => {
    const type = selectType(action)
    const key = selectKey(action)
    const value = selectValue(action)
    return state.map(item => {
      const newAction = deleteMetaKey({ type, id: item.id, key, value })
      return itemReducer(item, newAction)
    })
  },
  [COLLECTION_CONCAT]: (state, action) => {
    const { payload } = action || {}
    const { data } = payload

    if (data) { return state.concat(data) }
    return state
  },
  [COLLECTION_FILTER]: (state, action) => state.filter(action.payload.func),
  [COLLECTION_MAP]: (state, action) => state.map(action.payload.func),
  [COLLECTION_PUSH]: (state, action) => {
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
  [COLLECTION_REVERSE]: (state, action) => [...state].reverse(),
  [COLLECTION_SLICE]: (state, action) => state.slice(action.payload.options.begin, action.payload.options.end),
  [COLLECTION_SORT]: (state, action) => [...state].sort(action.payload.func),
  [COLLECTION_SPLICE]: (state, action) => {
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
  [COLLECTION_UNSHIFT]: (state, action) => {
    const { payload } = action || {}
    const { data } = payload
    const newState = [...state]

    if (data) {
      Array.isArray(data) ? newState.unshift(...data) : newState.unshift(data)
    } else { return state }

    return newState
  }
}, [])

export default (type, options = {}) => (state, action) => {
  if (state === undefined) {
    state = get(options, 'data', [])
  }
  if (!action) { return state }

  const collectionType = selectType(action)
  const id = selectId(action)

  // bail if collection type is wrong
  if (!collectionType || collectionType !== type) { return state }

  // add collection options to the action
  const newAction = { ...action, meta: { ...action.meta, options } }

  return reduceReducers(
    mapActionToItemReducer(type, id),
    dataReducer
  )(state, newAction)
}
