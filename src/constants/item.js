export const ITEM_CREATE_NEW = '@@redux-data-collections/ITEM_CREATE_NEW' // <-- assigns uuid
export const ITEM_LOAD = '@@redux-data-collections/ITEM_LOAD' // <-- replace
export const ITEM_ADD = '@@redux-data-collections/ITEM_ADD' // <-- won't replace or update
export const ITEM_UPDATE = '@@redux-data-collections/ITEM_UPDATE' // <-- merge or add if missing
export const ITEM_DESTROY = '@@redux-data-collections/ITEM_DESTROY' // <-- removes from collection

// middleware
export const ITEM_FETCH = '@@redux-data-collections/ITEM_FETCH'
export const ITEM_SAVE = '@@redux-data-collections/ITEM_SAVE'
export const ITEM_RELOAD = '@@redux-data-collections/ITEM_RELOAD'
export const ITEM_DELETE = '@@redux-data-collections/ITEM_DELETE'

// meta
export const ITEM_BEGIN_LOADING = '@@redux-data-collections/ITEM_BEGIN_LOADING'
export const ITEM_END_LOADING = '@@redux-data-collections/ITEM_END_LOADING'
export const ITEM_META_SET = '@@redux-data-collections/ITEM_META_SET'
export const ITEM_META_TOGGLE = '@@redux-data-collections/ITEM_META_TOGGLE'
export const ITEM_META_DELETE = '@@redux-data-collections/ITEM_META_DELETE'
