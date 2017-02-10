export const ITEM_CREATE_NEW = '@@redux-data/ITEM_CREATE_NEW' // <-- assigns uuid
export const ITEM_LOAD = '@@redux-data/ITEM_LOAD' // <-- replace
export const ITEM_ADD = '@@redux-data/ITEM_ADD' // <-- won't replace or update
export const ITEM_UPDATE = '@@redux-data/ITEM_UPDATE' // <-- merge or add if missing
export const ITEM_DESTROY = '@@redux-data/ITEM_DESTROY' // <-- removes from collection

// middleware
export const ITEM_FETCH = '@@redux-data/ITEM_FETCH'
export const ITEM_SAVE = '@@redux-data/ITEM_SAVE'
export const ITEM_RELOAD = '@@redux-data/ITEM_RELOAD'
export const ITEM_DELETE = '@@redux-data/ITEM_DELETE'

// meta
export const ITEM_BEGIN_LOADING = '@@redux-data/ITEM_BEGIN_LOADING'
export const ITEM_END_LOADING = '@@redux-data/ITEM_END_LOADING'
export const ITEM_META_SET = '@@redux-data/ITEM_META_SET'
export const ITEM_META_TOGGLE = '@@redux-data/ITEM_META_TOGGLE'
export const ITEM_META_DELETE = '@@redux-data/ITEM_META_DELETE'
