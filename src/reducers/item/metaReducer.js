import { handleActions } from 'redux-actions'
import {
  ITEM_DELETE,
  ITEM_COMMIT,
  ITEM_BEGIN_LOADING,
  ITEM_END_LOADING,
  ITEM_BEGIN_SAVING,
  ITEM_END_SAVING,

  ITEM_META_SET,
  ITEM_META_TOGGLE,
  ITEM_META_DELETE
} from '../../constants/item'
import {
  ITEM_ATTRIBUTES_SET_OBJECT,
  ITEM_ATTRIBUTE_SET,
  ITEM_ATTRIBUTE_RESET,
  ITEM_ATTRIBUTE_TOGGLE,
  ITEM_ATTRIBUTE_DELETE
} from '../../constants/attributes'
import { selectData, selectKey, selectValue } from '../../selectors/action'
import get from 'lodash.get'
import changedAttributesReducer from './changedAttributesReducer'
import deletedAttributesReducer from './deletedAttributesReducer'

const itemMetaReducer = handleActions({
  [ITEM_DELETE]: (state, action) => {
    return { ...state, isDeleted: true }
  },
  [ITEM_COMMIT]: (state, action) => {
    const newState = { ...state, isSaved: false }
    delete newState.changedAttributes
    delete newState.deletedAttributes
    return newState
  },

  [ITEM_ATTRIBUTES_SET_OBJECT]: (state, action) => {
    const data = selectData(action)
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
    const { changedAttributes } = state
    return {
      ...state,
      changedAttributes: changedAttributesReducer(changedAttributes, action),
      isSaved: false
    }
  },
  [ITEM_ATTRIBUTE_RESET]: (state, action) => {
    const changedAttributes = get(state, 'changedAttributes')
    const deletedAttributes = get(state, 'deletedAttributes')
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
    const changedAttributes = get(state, 'changedAttributes')
    const deletedAttributes = get(state, 'deletedAttributes')
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
    const changedAttributes = get(state, 'changedAttributes')
    const deletedAttributes = get(state, 'deletedAttributes')
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
  },
  [ITEM_BEGIN_LOADING]: (state, action) => {
    return { ...state, isSaving: true }
  },
  [ITEM_END_LOADING]: (state, action) => {
    return { ...state, isSaving: false }
  },
  [ITEM_BEGIN_SAVING]: (state, action) => {
    return { ...state, isSaving: true }
  },
  [ITEM_END_SAVING]: (state, action) => {
    const newState = { ...state, isSaving: false, isSaved: true }
    if (newState.hasOwnProperty('isNew')) { delete newState.isNew }
    return newState
  }
}, {})

export default itemMetaReducer
