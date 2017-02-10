import { createStandardAction } from './'
import {
  // advanced
  ITEM_ATTRIBUTES_MAP,

  // raw
  ITEM_ATTRIBUTES_RAW_SET_OBJECT,
  ITEM_ATTRIBUTES_RAW_MERGE,
  ITEM_ATTRIBUTES_RAW_ASSIGN,
  ITEM_ATTRIBUTE_RAW_SET,
  ITEM_ATTRIBUTE_RAW_TOGGLE,
  ITEM_ATTRIBUTE_RAW_DELETE,

  // buffered -- happens in meta
  ITEM_ATTRIBUTES_SET_OBJECT,
  ITEM_ATTRIBUTES_ASSIGN,
  ITEM_ATTRIBUTES_MERGE,
  ITEM_ATTRIBUTE_SET,
  ITEM_ATTRIBUTE_RESET,
  ITEM_ATTRIBUTE_TOGGLE,
  ITEM_ATTRIBUTE_DELETE,
  ITEM_ATTRIBUTES_ROLLBACK
} from '../constants/attributes'

// advanced
export const mapAttributes = createStandardAction(ITEM_ATTRIBUTES_MAP)

// raw
export const setRawAttributesObject = createStandardAction(ITEM_ATTRIBUTES_RAW_SET_OBJECT)
export const assignRawAttributes = createStandardAction(ITEM_ATTRIBUTES_RAW_ASSIGN)
export const mergeRawAttributes = createStandardAction(ITEM_ATTRIBUTES_RAW_MERGE)

export const setRawAttribute = createStandardAction(ITEM_ATTRIBUTE_RAW_SET)
export const toggleRawAttribute = createStandardAction(ITEM_ATTRIBUTE_RAW_TOGGLE)
export const deleteRawAttribute = createStandardAction(ITEM_ATTRIBUTE_RAW_DELETE)

// buffered -- happens in meta
export const setAttributesObject = createStandardAction(ITEM_ATTRIBUTES_SET_OBJECT)
export const assignAttributes = createStandardAction(ITEM_ATTRIBUTES_ASSIGN)
export const mergeAttributesObject = createStandardAction(ITEM_ATTRIBUTES_MERGE)

export const setAttribute = createStandardAction(ITEM_ATTRIBUTE_SET)
export const resetAttribute = createStandardAction(ITEM_ATTRIBUTE_RESET)
export const toggleAttribute = createStandardAction(ITEM_ATTRIBUTE_TOGGLE)
export const deleteAttribute = createStandardAction(ITEM_ATTRIBUTE_DELETE)
export const rollbackAttributes = createStandardAction(ITEM_ATTRIBUTES_ROLLBACK)
