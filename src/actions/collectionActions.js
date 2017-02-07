import { createStandardAction } from './'

import {
  COLLECTION_ADD_ITEMS,
  COLLECTION_ADD_SET,

  // middleware
  COLLECTION_FETCH_ITEMS,
  COLLECTION_FETCH_SET,

  // meta
  COLLECTION_BEGIN_LOADING_ITEMS,
  COLLECTION_END_LOADING_ITEMS,
  COLLECTION_BEGIN_LOADING_SET,
  COLLECTION_END_LOADING_SET,

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
} from '../constants/collectionConstants'

export const addItems = createStandardAction(COLLECTION_ADD_ITEMS)
export const addSet = createStandardAction(COLLECTION_ADD_SET)

// middleware
export const fetchItems = createStandardAction(COLLECTION_FETCH_ITEMS)
export const fetchSet = createStandardAction(COLLECTION_FETCH_SET)

// meta
export const beginLoadingItems = createStandardAction(COLLECTION_BEGIN_LOADING_ITEMS)
export const endLoadingItems = createStandardAction(COLLECTION_END_LOADING_ITEMS)
export const beginLoadingSet = createStandardAction(COLLECTION_BEGIN_LOADING_SET)
export const endLoadingSet = createStandardAction(COLLECTION_END_LOADING_SET)

// advanced
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
