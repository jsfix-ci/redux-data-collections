import { handleActions } from 'redux-actions'
import reduceReducers from 'reduce-reducers'
import itemReducer from '../itemReducer'
import {
  ITEM_CREATE_NEW,
  ITEM_ADD
} from '../../constants/itemConstants'
import {
  COLLECTION_ADD_ITEMS,
  COLLECTION_ADD_SET,

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
} from '../../constants/collectionConstants'
import { addItem, updateItem } from '../../actions/itemActions'
import { selectType, selectId, selectData } from '../../selectors/actionSelectors'

// routes actions to items using action.meta.id
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
  [COLLECTION_ADD_SET]: (state, action) => {
    const newAction = { ...action, type: COLLECTION_ADD_ITEMS }
    return dataReducer(state, newAction)
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

export default (type, options = {}) => (state = [], action) => {
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
