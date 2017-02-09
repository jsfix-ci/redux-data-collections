import { handleActions } from 'redux-actions'
import {
  ITEM_SAVE,
  ITEM_ATTRIBUTES_SET,
  ITEM_ATTRIBUTE_SET,
  ITEM_ATTRIBUTE_RESET,
  ITEM_ATTRIBUTE_TOGGLE,
  ITEM_ATTRIBUTE_DELETE,

  ITEM_META_SET,
  ITEM_META_TOGGLE,
  ITEM_META_DELETE
} from '../constants/itemConstants'
import { selectType, selectId, selectData, selectKey, selectValue } from '../selectors/actionSelectors'

const removeAttribute = (state, action) => {
  const { payload } = action
  const { key } = payload
  const newState = { ...state }
  delete newState[key]
  return newState
}

const changedAttributesReducer = handleActions({
  [ITEM_ATTRIBUTE_SET]: (state, action) => {
    const { payload } = action
    const { key, value } = payload
    return {
      ...state,
      [key]: value
    }
  },
  [ITEM_ATTRIBUTE_RESET]: removeAttribute,
  [ITEM_ATTRIBUTE_TOGGLE]: (state, action) => {
    const { payload, meta } = action
    const { value } = meta || {}
    const { key } = payload
    const newValue = state[key] === undefined ? !value : !state[key]
    if (newValue === value) {
      const newState = { ...state }
      delete newState[key]
      return newState
    }
    return {
      ...state,
      [key]: newValue
    }
  },
  [ITEM_ATTRIBUTE_DELETE]: removeAttribute
}, '')

const deletedAttributesReducer = handleActions({
  [ITEM_ATTRIBUTE_RESET]: (state, action) => {
    const { payload } = action
    const { key } = payload
    return state.filter(value => !key)
  },
  [ITEM_ATTRIBUTE_DELETE]: (state, action) => {
    const { payload } = action
    const { key } = payload
    return [ ...state, key ]
  }
}, [])

const itemMetaReducer = handleActions({
  [ITEM_SAVE]: (state, action) => {
    const newState = { ...state, isSaved: true }
    delete newState.changedAttributes
    delete newState.deletedAttributes
    return newState
  },
  [ITEM_ATTRIBUTES_SET]: (state, action) => {
    const { payload } = action
    const { data } = payload
    const { changedAttributes } = state

    return {
      ...state,
      changedAttributes: {
        ...changedAttributes,
        ...data
      },
      isSaved: false
    }
  },
  [ITEM_ATTRIBUTE_SET]: (state, action) => {
    const { meta } = state
    const { changedAttributes } = meta || {}

    return {
      ...state,
      changedAttributes: changedAttributesReducer(changedAttributes, action),
      isSaved: false
    }
  },
  [ITEM_ATTRIBUTE_RESET]: (state, action) => {
    const { changedAttributes, deletedAttributes } = state || {}
    const newChangedAttributes = changedAttributesReducer(changedAttributes, action)
    const newDeletedAttributes = deletedAttributesReducer(deletedAttributes, action)
    const hasChangedAttributes = !!Object.keys(newChangedAttributes).length
    const hasDeletedAttributes = newDeletedAttributes.length

    const newState = { ...state }
    if (hasChangedAttributes) {
      newState.changedAttributes = newChangedAttributes
    } else {
      delete newState.changedAttributes
    }
    if (hasDeletedAttributes) {
      newState.deletedAttributes = newDeletedAttributes
    } else {
      delete newState.deletedAttributes
    }
    newState.isSaved = !hasChangedAttributes && !hasDeletedAttributes
    return newState
  },
  [ITEM_ATTRIBUTE_TOGGLE]: (state, action) => {
    const { changedAttributes, deletedAttributes } = state || {}
    const newState = { ...state }

    const newChangedAttributes = changedAttributesReducer(changedAttributes, action)
    const hasChangedAttributes = !!Object.keys(newChangedAttributes).length

    if (hasChangedAttributes) {
      newState.changedAttributes = newChangedAttributes
      newState.isSaved = false
    } else if (!hasChangedAttributes && changedAttributes) {
      delete newState.changedAttributes
      newState.isSaved = !deletedAttributes
    }

    return newState
  },
  [ITEM_ATTRIBUTE_DELETE]: (state, action) => {
    const { changedAttributes, deletedAttributes } = state
    const newState = {
      ...state,
      deletedAttributes: deletedAttributesReducer(deletedAttributes, action),
      isSaved: false
    }

    if (changedAttributes) {
      const newChangedAttributes = changedAttributesReducer(changedAttributes, action)
      const hasChangedAttributes = !!Object.keys(newChangedAttributes).length
      if (hasChangedAttributes) {
        newState.changedAttributes = newChangedAttributes
      } else if (!hasChangedAttributes && changedAttributes) {
        delete newState.changedAttributes
      }
    }
    return newState
  },
  [ITEM_META_SET]: (state, action) => {
    const key = selectKey(action)
    const value = selectValue(action)
    if (!key) { return state }
    return { ...state, [key]: value }
  },
  [ITEM_META_TOGGLE]: (state, action) => {
    const key = selectKey(action)
    if (!key) { return state }
    return { ...state, [key]: !state[key] }
  },
  [ITEM_META_DELETE]: (state, action) => {
    const key = selectKey(action)
    if (!key) { return state }
    const newState = { ...state }
    delete newState[key]
    return newState
  }
}, {})

export default itemMetaReducer
