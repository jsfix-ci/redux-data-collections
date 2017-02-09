import { createStandardAction } from './'

import {
  ITEM_CREATE_NEW,
  ITEM_ADD,
  ITEM_UPDATE,

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
  ITEM_ATTRIBUTE_DELETE,

  ITEM_META_SET,
  ITEM_META_TOGGLE,
  ITEM_META_DELETE
 } from '../constants/itemConstants'

// payload: { type, data }
export const createNew = createStandardAction(ITEM_CREATE_NEW)
export const addItem = createStandardAction(ITEM_ADD)
export const updateItem = createStandardAction(ITEM_UPDATE)

// saves to server
// payload: { type, id }
export const save = createStandardAction(ITEM_SAVE)

// reloads from server
// payload: { type, id }
export const reload = createStandardAction(ITEM_RELOAD)

// deletes from the server
// payload: { type, id }
export const deleteItem = createStandardAction(ITEM_DELETE)

// deletes from local array
// payload: { type, id }
export const destroyItem = createStandardAction(ITEM_DESTROY)

export const mapAttributes = createStandardAction(ITEM_ATTRIBUTES_MAP)
export const rollbackAttributes = createStandardAction(ITEM_ATTRIBUTES_ROLLBACK)

export const setAttributes = createStandardAction(ITEM_ATTRIBUTES_SET)

// payload: { type, id, key, value }
export const setAttribute = createStandardAction(ITEM_ATTRIBUTE_SET)

// payload: { type, id, key }
export const resetAttribute = createStandardAction(ITEM_ATTRIBUTE_RESET)

// payload: { type, id, key }
export const toggleAttribute = createStandardAction(ITEM_ATTRIBUTE_TOGGLE)

// payload: { type, id, key }
export const deleteAttribute = createStandardAction(ITEM_ATTRIBUTE_DELETE)

export const setMetaKey = createStandardAction(ITEM_META_SET)
export const toggleMetaKey = createStandardAction(ITEM_META_TOGGLE)
export const deleteMetaKey = createStandardAction(ITEM_META_DELETE)
