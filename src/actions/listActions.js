import { createAction } from 'redux-actions'
import {
  REDUX_DATA_LIST_CONCAT,
  REDUX_DATA_LIST_FILTER,
  REDUX_DATA_LIST_MAP,
  REDUX_DATA_LIST_PUSH,
  REDUX_DATA_LIST_REVERSE,
  REDUX_DATA_LIST_SLICE,
  REDUX_DATA_LIST_SORT,
  REDUX_DATA_LIST_SPLICE,
  REDUX_DATA_LIST_UNSHIFT
} from '../constants/listConstants'

// @see https://lodash.com/docs/4.17.2
// TODO: difference, intersection, union

// like: concat({ type: 'post', posts: [{ type: 'post', id: 'post-id-1', ... }] })
// like: push({ type: 'post', post: { type: 'post', id: 'post-id-1' } })
// like: push({ type: 'post', posts: [{ type: 'post', id: 'post-id-1' }] })

// payload: { type, [types] } -> { type: 'post', posts: [] }
export const concat = createAction(REDUX_DATA_LIST_CONCAT)

// payload: { type, filter: func }
export const filter = createAction(REDUX_DATA_LIST_FILTER)

// payload: { type, map: func }
export const map = createAction(REDUX_DATA_LIST_MAP)

// payload: { type, [type] || [types] }
export const push = createAction(REDUX_DATA_LIST_PUSH)

// payload: { type }
export const reverse = createAction(REDUX_DATA_LIST_REVERSE)

// payload: { type, begin: index, end: index }
export const slice = createAction(REDUX_DATA_LIST_SLICE)

// payload: { type, sort: func }
export const sort = createAction(REDUX_DATA_LIST_SORT)

// payload: { type, begin: index, end: index, [type] || [types] }
export const splice = createAction(REDUX_DATA_LIST_SPLICE)

// payload: { type, [type] || [types] }
export const unshift = createAction(REDUX_DATA_LIST_UNSHIFT)
