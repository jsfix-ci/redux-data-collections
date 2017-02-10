// advanced
export const ITEM_ATTRIBUTES_MAP = '@@redux-data/ITEM_ATTRIBUTES_MAP'

// raw
export const ITEM_ATTRIBUTES_RAW_SET_OBJECT = '@@redux-data/ITEM_ATTRIBUTES_RAW_SET_OBJECT'
// @see https://www.npmjs.com/package/lodash.assign
// @see https://www.npmjs.com/package/lodash.merge
export const ITEM_ATTRIBUTES_RAW_MERGE = '@@redux-data/ITEM_ATTRIBUTES_RAW_MERGE'
export const ITEM_ATTRIBUTES_RAW_ASSIGN = '@@redux-data/ITEM_ATTRIBUTES_RAW_ASSIGN'

export const ITEM_ATTRIBUTE_RAW_SET = '@@redux-data/ITEM_ATTRIBUTE_RAW_SET'
export const ITEM_ATTRIBUTE_RAW_TOGGLE = '@@redux-data/ITEM_ATTRIBUTE_RAW_TOGGLE'
export const ITEM_ATTRIBUTE_RAW_DELETE = '@@redux-data/ITEM_ATTRIBUTE_RAW_DELETE'

// buffered -- happens in item/meta
export const ITEM_ATTRIBUTES_SET_OBJECT = '@@redux-data/ITEM_ATTRIBUTES_SET_OBJECT'
export const ITEM_ATTRIBUTES_ASSIGN = '@@redux-data/ITEM_ATTRIBUTES_ASSIGN'
export const ITEM_ATTRIBUTES_MERGE = '@@redux-data/ITEM_ATTRIBUTES_MERGE'

export const ITEM_ATTRIBUTE_SET = '@@redux-data/ITEM_ATTRIBUTE_SET'
export const ITEM_ATTRIBUTE_RESET = '@@redux-data/ITEM_ATTRIBUTE_RESET'
export const ITEM_ATTRIBUTE_TOGGLE = '@@redux-data/ITEM_ATTRIBUTE_TOGGLE'
export const ITEM_ATTRIBUTE_DELETE = '@@redux-data/ITEM_ATTRIBUTE_DELETE'
export const ITEM_ATTRIBUTES_ROLLBACK = '@@redux-data/ITEM_ATTRIBUTES_ROLLBACK'

// TODO: history
// per attribute, keep array of last 100 changes made since loading, throttled at 400ms
