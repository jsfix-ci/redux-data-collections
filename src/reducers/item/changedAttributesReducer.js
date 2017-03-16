import { handleActions } from 'redux-actions'
import {
  ITEM_ATTRIBUTE_SET,
  ITEM_ATTRIBUTE_RESET,
  ITEM_ATTRIBUTE_TOGGLE,
  ITEM_ATTRIBUTE_DELETE
} from '../../constants/attributes'
import { selectKey, selectValue } from '../../selectors/action'

const removeAttribute = (state, action) => {
  const key = selectKey(action)
  const newState = { ...state }
  delete newState[key]
  return newState
}

const changedAttributesReducer = handleActions({
  [ITEM_ATTRIBUTE_SET]: (state, action) => {
    const key = selectKey(action)
    const value = selectValue(action)
    return {
      ...state,
      [key]: value
    }
  },
  [ITEM_ATTRIBUTE_RESET]: removeAttribute,
  [ITEM_ATTRIBUTE_TOGGLE]: (state, action) => {
    const { meta } = action
    const { value } = meta || {} // value from item.attributes
    const key = selectKey(action)
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

export default changedAttributesReducer
