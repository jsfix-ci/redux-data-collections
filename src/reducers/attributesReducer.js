import { handleActions } from 'redux-actions'
import {
  ITEM_ATTRIBUTES_MAP
  // TODO:
  // ITEM_ATTRIBUTE_FORCE_SET,
  // ITEM_ATTRIBUTE_FORCE_TOGGLE,
  // ITEM_ATTRIBUTE_FORCE_DELETE
} from '../constants/itemConstants'

// const mapActionToAttributeReducer = (state, action) => {
//   const { payload } = action
//   if (!payload) { return state }
//
//   const { attribute } = payload
//   if (!attribute) { return state }
//
//   return {
//     ...state,
//     [attribute]: attributeReducer(state[attribute], action)
//   }
// }

const attributesReducer = handleActions({
  // TODO: this seems useless
  [ITEM_ATTRIBUTES_MAP]: (state, action) => {
    const { payload } = action
    const { func } = payload
    const keys = Object.keys(state)
    return keys.map(key => func(state[key], key, state)).reduce((attributes, value, i) => {
      attributes[keys[i]] = value
      return attributes
    }, {})
  }
}, {})

export default attributesReducer
