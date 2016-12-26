import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import relationshipsReducer from './relationshipsReducer'
import {
  REDUX_DATA_ITEM_ATTRIBUTES_FOR_EACH,
  REDUX_DATA_ITEM_ATTRIBUTES_ROLLBACK,
  REDUX_DATA_ITEM_ATTRIBUTE_SET,
  REDUX_DATA_ITEM_ATTRIBUTE_RESET,
  REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE,
  REDUX_DATA_ITEM_ATTRIBUTE_DELETE
} from '../constants/itemConstants'

// TODO: move to another file
// TODO: mark in meta.changedAttributes
const attributeReducer = handleActions({
  [REDUX_DATA_ITEM_ATTRIBUTE_SET]: (state, action) => action.payload.value,
  [REDUX_DATA_ITEM_ATTRIBUTE_RESET]: (state, action) => state, // TODO: pull from meta.changedAttributes
  [REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE]: (state, action) => !state,
  [REDUX_DATA_ITEM_ATTRIBUTE_DELETE]: (state, action) => undefined
}, '')

const mapActionToAttributeReducer = (state, action) => {
  const { payload } = action
  const { attribute } = payload.attribute
  if (!attribute) { return state }

  return {
    ...state,
    [attribute]: attributeReducer(state[attribute], action)
  }
}

// TODO: move to another file
const attributesReducer = handleActions({
  [REDUX_DATA_ITEM_ATTRIBUTES_FOR_EACH]: (state, action) => {
    return state
  },
  [REDUX_DATA_ITEM_ATTRIBUTES_ROLLBACK]: (state, action) => {
    return state
  },
  [REDUX_DATA_ITEM_ATTRIBUTE_SET]: mapActionToAttributeReducer,
  [REDUX_DATA_ITEM_ATTRIBUTE_RESET]: mapActionToAttributeReducer,
  [REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE]: mapActionToAttributeReducer,
  [REDUX_DATA_ITEM_ATTRIBUTE_DELETE]: mapActionToAttributeReducer
}, {})

const itemReducer = combineReducers({
  attributes: attributesReducer,
  relationships: relationshipsReducer
})

export default itemReducer
