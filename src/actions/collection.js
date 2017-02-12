import { createStandardAction } from './'

import {
  COLLECTION_LOAD_ITEMS,
  COLLECTION_LOAD_INCLUDED_ITEMS,
  COLLECTION_ADD_ITEMS,

  // middleware
  COLLECTION_FETCH_ITEMS,

  // meta
  COLLECTION_BEGIN_LOADING_ITEMS,
  COLLECTION_END_LOADING_ITEMS,

  // all
  COLLECTION_SET_ALL_META,
  COLLECTION_DELETE_ALL_META,

  // advanced
  COLLECTION_CONCAT,
  COLLECTION_FILTER,
  COLLECTION_MAP,
  COLLECTION_PUSH,
  COLLECTION_REVERSE,
  COLLECTION_SLICE,
  COLLECTION_SORT,
  COLLECTION_SPLICE,
  COLLECTION_UNSHIFT
} from '../constants/collection'

export const loadItems = createStandardAction(COLLECTION_LOAD_ITEMS)
export const loadIncludedItems = createStandardAction(COLLECTION_LOAD_INCLUDED_ITEMS)
export const addItems = createStandardAction(COLLECTION_ADD_ITEMS)

// middleware
export const fetchItems = createStandardAction(COLLECTION_FETCH_ITEMS)

// meta
export const beginLoadingItems = createStandardAction(COLLECTION_BEGIN_LOADING_ITEMS)
export const endLoadingItems = createStandardAction(COLLECTION_END_LOADING_ITEMS)

export const setAllMetaKey = createStandardAction(COLLECTION_SET_ALL_META)
export const deleteAllMetaKey = createStandardAction(COLLECTION_DELETE_ALL_META)

// advanced
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// @see https://lodash.com/docs/4.17.2
// TODO: difference, intersection, union
export const concat = createStandardAction(COLLECTION_CONCAT)
export const filter = createStandardAction(COLLECTION_FILTER)
export const map = createStandardAction(COLLECTION_MAP)
export const push = createStandardAction(COLLECTION_PUSH)
export const reverse = createStandardAction(COLLECTION_REVERSE)
export const slice = createStandardAction(COLLECTION_SLICE)
export const sort = createStandardAction(COLLECTION_SORT)
export const splice = createStandardAction(COLLECTION_SPLICE)
export const unshift = createStandardAction(COLLECTION_UNSHIFT)
