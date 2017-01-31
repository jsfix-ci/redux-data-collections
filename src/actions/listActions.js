import { createStandardAction } from './'

import {
  LIST_CONCAT,
  LIST_FILTER,
  LIST_MAP,
  LIST_PUSH,
  LIST_REVERSE,
  LIST_SLICE,
  LIST_SORT,
  LIST_SPLICE,
  LIST_UNSHIFT
} from '../constants/listConstants'

// @see https://lodash.com/docs/4.17.2
// TODO: difference, intersection, union

// like: concat({ type: 'post', posts: [{ type: 'post', id: 'post-id-1', ... }] })
// like: push({ type: 'post', post: { type: 'post', id: 'post-id-1' } })
// like: push({ type: 'post', posts: [{ type: 'post', id: 'post-id-1' }] })

// payload: { type, data }
export const concat = createStandardAction(LIST_CONCAT)

// payload: { type, filter: func }
export const filter = createStandardAction(LIST_FILTER)

// payload: { type, map: func }
export const map = createStandardAction(LIST_MAP)

// payload: { type, data }
export const push = createStandardAction(LIST_PUSH)

// payload: { type }
export const reverse = createStandardAction(LIST_REVERSE)

// payload: { type, options: { begin: index, end: index } }
export const slice = createStandardAction(LIST_SLICE)

// payload: { type, sort: func }
export const sort = createStandardAction(LIST_SORT)

// payload: { type, begin: index, end: index, data }
export const splice = createStandardAction(LIST_SPLICE)

// payload: { type, data }
export const unshift = createStandardAction(LIST_UNSHIFT)
