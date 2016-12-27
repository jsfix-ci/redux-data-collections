import { handleActions } from 'redux-actions'
import {
  REDUX_DATA_ITEM_SAVE,
  REDUX_DATA_ITEM_ATTRIBUTES_SET,
  REDUX_DATA_ITEM_ATTRIBUTE_SET,
  REDUX_DATA_ITEM_ATTRIBUTE_RESET,
  REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE,
  REDUX_DATA_ITEM_ATTRIBUTE_DELETE
} from 'constants/itemConstants'

const changedAttributesReducer = handleActions({
  [REDUX_DATA_ITEM_ATTRIBUTE_SET]: (state, action) => {
    const { payload } = action
    const { attribute, value } = payload
    return {
      ...state,
      [attribute]: value
    }
  },
  [REDUX_DATA_ITEM_ATTRIBUTE_RESET]: (state, action) => {
    const { payload } = action
    const { attribute } = payload
    const newState = { ...state }
    delete newState[attribute]
    return newState
  },
  [REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE]: (state, action) => {
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
  // NOTE: dupe of REDUX_DATA_ITEM_ATTRIBUTE_RESET
  [REDUX_DATA_ITEM_ATTRIBUTE_DELETE]: (state, action) => {
    const { payload } = action
    const { attribute } = payload
    const newState = { ...state }
    delete newState[attribute]
    return newState
  }
}, '')

const deletedAttributesReducer = handleActions({
  [REDUX_DATA_ITEM_ATTRIBUTE_RESET]: (state, action) => {
    const { payload } = action
    const { attribute } = payload
    return state.filter(value => !attribute)
  },
  [REDUX_DATA_ITEM_ATTRIBUTE_DELETE]: (state, action) => {
    const { payload } = action
    const { attribute } = payload
    return [ ...state, attribute ]
  }
}, [])

const itemMetaReducer = handleActions({
  [REDUX_DATA_ITEM_SAVE]: (state, action) => {
    const newState = { ...state, isSaved: true }
    delete newState.changedAttributes
    delete newState.deletedAttributes
    return newState
  },
  [REDUX_DATA_ITEM_ATTRIBUTES_SET]: (state, action) => {
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
  [REDUX_DATA_ITEM_ATTRIBUTE_SET]: (state, action) => {
    const { meta } = state
    const { changedAttributes } = meta || {}

    return {
      ...state,
      changedAttributes: changedAttributesReducer(changedAttributes, action),
      isSaved: false
    }
  },
  [REDUX_DATA_ITEM_ATTRIBUTE_RESET]: (state, action) => {
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
  [REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE]: (state, action) => {
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
  [REDUX_DATA_ITEM_ATTRIBUTE_DELETE]: (state, action) => {
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
