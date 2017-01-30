import { createAction } from './'
import {
  ITEM_CREATE_NEW,
  ITEM_ADD,
  ITEM_SAVE,
  ITEM_RELOAD,
  ITEM_DELETE,
  ITEM_DESTROY,

  ITEM_ATTRIBUTES_MAP,
  ITEM_ATTRIBUTES_ROLLBACK,
  ITEM_ATTRIBUTES_SET,
  ITEM_ATTRIBUTE_SET,
  ITEM_ATTRIBUTE_RESET,
  ITEM_ATTRIBUTE_TOGGLE,
  ITEM_ATTRIBUTE_DELETE
 } from '../constants/itemConstants'

// payload: { type, data }
export const createNew = createAction(ITEM_CREATE_NEW)

export const addItem = createAction(ITEM_ADD)

// saves to server
// payload: { type, id }
export const save = createAction(ITEM_SAVE)

// reloads from server
// payload: { type, id }
export const reload = createAction(ITEM_RELOAD)

// deletes from the server
// payload: { type, id }
export const deleteItem = createAction(ITEM_DELETE)

// deletes from local array
// payload: { type, id }
export const destroyItem = createAction(ITEM_DESTROY)

export const mapAttributes = createAction(ITEM_ATTRIBUTES_MAP)
export const rollbackAttributes = createAction(ITEM_ATTRIBUTES_ROLLBACK)

export const setAttributes = createAction(ITEM_ATTRIBUTES_SET)

// payload: { type, id, attribute, value }
export const setAttribute = createAction(ITEM_ATTRIBUTE_SET)

// payload: { type, id, attribute }
export const resetAttribute = createAction(ITEM_ATTRIBUTE_RESET)

// payload: { type, id, attribute }
export const toggleAttribute = createAction(ITEM_ATTRIBUTE_TOGGLE)

// payload: { type, id, attribute }
export const deleteAttribute = createAction(ITEM_ATTRIBUTE_DELETE)
