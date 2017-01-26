import { createAction } from 'redux-actions'
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

// payload: { type, [types] } -> { type: 'post', posts: [] }
export const concat = createAction(LIST_CONCAT)

// payload: { type, filter: func }
export const filter = createAction(LIST_FILTER)

// payload: { type, map: func }
export const map = createAction(LIST_MAP)

// payload: { type, [type] || [types] }
export const push = createAction(LIST_PUSH)

// payload: { type }
export const reverse = createAction(LIST_REVERSE)

// payload: { type, begin: index, end: index }
export const slice = createAction(LIST_SLICE)

// payload: { type, sort: func }
export const sort = createAction(LIST_SORT)

// payload: { type, begin: index, end: index, [type] || [types] }
export const splice = createAction(LIST_SPLICE)

// payload: { type, [type] || [types] }
export const unshift = createAction(LIST_UNSHIFT)
