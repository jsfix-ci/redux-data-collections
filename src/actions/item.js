import { createStandardAction } from './'
import {
  ITEM_CREATE_NEW,
  ITEM_LOAD,
  ITEM_ADD,
  ITEM_UPDATE,
  ITEM_DESTROY,
  ITEM_COMMIT,

  // middleware
  ITEM_FETCH,
  ITEM_SAVE,
  ITEM_RELOAD,
  ITEM_DELETE,

  // meta
  ITEM_BEGIN_LOADING,
  ITEM_END_LOADING,
  ITEM_BEGIN_SAVING,
  ITEM_END_SAVING,
  ITEM_META_SET,
  ITEM_META_TOGGLE,
  ITEM_META_DELETE
 } from '../constants/item'

export const createNew = createStandardAction(ITEM_CREATE_NEW)
export const loadItem = createStandardAction(ITEM_LOAD)
export const addItem = createStandardAction(ITEM_ADD)
export const updateItem = createStandardAction(ITEM_UPDATE)
export const destroyItem = createStandardAction(ITEM_DESTROY)
export const commitItem = createStandardAction(ITEM_COMMIT)

// middleware
export const fetchItem = createStandardAction(ITEM_FETCH)
export const saveItem = createStandardAction(ITEM_SAVE)
export const reloadItem = createStandardAction(ITEM_RELOAD)
export const deleteItem = createStandardAction(ITEM_DELETE)

// meta
export const beginLoadingItem = createStandardAction(ITEM_BEGIN_LOADING)
export const endLoadingItem = createStandardAction(ITEM_END_LOADING)
export const beginSavingItem = createStandardAction(ITEM_BEGIN_SAVING)
export const endSavingItem = createStandardAction(ITEM_END_SAVING)
export const setMetaKey = createStandardAction(ITEM_META_SET)
export const toggleMetaKey = createStandardAction(ITEM_META_TOGGLE)
export const deleteMetaKey = createStandardAction(ITEM_META_DELETE)
