import { createAction } from 'redux-actions'
import {
  REDUX_DATA_ITEM_CREATE_NEW,
  REDUX_DATA_ITEM_SAVE,
  REDUX_DATA_ITEM_RELOAD,
  REDUX_DATA_ITEM_DELETE,
  REDUX_DATA_ITEM_DESTROY,

  REDUX_DATA_ITEM_ATTRIBUTES_FOR_EACH,
  REDUX_DATA_ITEM_ATTRIBUTES_ROLLBACK,
  REDUX_DATA_ITEM_ATTRIBUTE_SET,
  REDUX_DATA_ITEM_ATTRIBUTE_RESET,
  REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE,
  REDUX_DATA_ITEM_ATTRIBUTE_DELETE
 } from '../constants/itemConstants'

// payload: { type, [type] }
export const createNew = createAction(REDUX_DATA_ITEM_CREATE_NEW)

// saves to server
// payload: { type, id }
export const save = createAction(REDUX_DATA_ITEM_SAVE)

// reloads from server
// payload: { type, id }
export const reload = createAction(REDUX_DATA_ITEM_RELOAD)

// deletes from the server
// payload: { type, id }
export const deleteItem = createAction(REDUX_DATA_ITEM_DELETE)

// deletes from local array
// payload: { type, id }
export const destroyItem = createAction(REDUX_DATA_ITEM_DESTROY)

export const forEachAttribute = createAction(REDUX_DATA_ITEM_ATTRIBUTES_FOR_EACH)
export const rollbackAttributes = createAction(REDUX_DATA_ITEM_ATTRIBUTES_ROLLBACK)

// payload: { type, id, attribute, value }
export const setAttribute = createAction(REDUX_DATA_ITEM_ATTRIBUTE_SET)

// payload: { type, id, attribute }
export const resetAttribute = createAction(REDUX_DATA_ITEM_ATTRIBUTE_RESET)

// payload: { type, id, attribute }
export const toggleAttribute = createAction(REDUX_DATA_ITEM_ATTRIBUTE_TOGGLE)

// payload: { type, id, attribute }
export const deleteAttribute = createAction(REDUX_DATA_ITEM_ATTRIBUTE_DELETE)
