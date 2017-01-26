import { handleActions } from 'redux-actions'
import {
  ITEM_SAVE,
  ITEM_ATTRIBUTES_SET,
  ITEM_ATTRIBUTE_SET,
  ITEM_ATTRIBUTE_RESET,
  ITEM_ATTRIBUTE_TOGGLE,
  ITEM_ATTRIBUTE_DELETE
} from '../constants/itemConstants'

const removeAttribute = (state, action) => {
  const { payload } = action
  const { attribute } = payload
  const newState = { ...state }
  delete newState[attribute]
  return newState
}

const changedAttributesReducer = handleActions({
  [ITEM_ATTRIBUTE_SET]: (state, action) => {
    const { payload } = action
    const { attribute, value } = payload
    return {
      ...state,
      [attribute]: value
    }
  },
  [ITEM_ATTRIBUTE_RESET]: removeAttribute,
  [ITEM_ATTRIBUTE_TOGGLE]: (state, action) => {
    const { payload, meta } = action
    const { value } = meta || {}
    const { attribute } = payload
    const newValue = state[attribute] === undefined ? !value : !state[attribute]
    if (newValue && value) {
      const newState = { ...state }
      delete newState[attribute]
      return newState
    }
    return {
      ...state,
      [attribute]: newValue
    }
  },
  [ITEM_ATTRIBUTE_DELETE]: removeAttribute
}, '')

const deletedAttributesReducer = handleActions({
  [ITEM_ATTRIBUTE_RESET]: (state, action) => {
    const { payload } = action
    const { attribute } = payload
    return state.filter(value => !attribute)
  },
  [ITEM_ATTRIBUTE_DELETE]: (state, action) => {
    const { payload } = action
    const { attribute } = payload
    return [ ...state, attribute ]
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
    const { attributes } = payload
    const { changedAttributes } = state

    return {
      ...state,
      changedAttributes: {
        ...changedAttributes,
        ...attributes
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
  }
}, {})

export default itemMetaReducer
