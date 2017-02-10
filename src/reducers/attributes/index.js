// NOTE: buffered -- most attribute related actions happen in ../item/meta.js
import { handleActions } from 'redux-actions'
import {
  // overrides
  // TODO:
  // ITEM_ATTRIBUTE_RAW_SET,
  // ITEM_ATTRIBUTE_RAW_TOGGLE,
  // ITEM_ATTRIBUTE_RAW_DELETE

  // advanced -- allows to map, reduce the entire attributes object
  ITEM_ATTRIBUTES_MAP
} from '../../constants/attributes'

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

export default options => attributesReducer
