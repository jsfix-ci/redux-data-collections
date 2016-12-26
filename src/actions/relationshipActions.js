import { createAction } from 'redux-actions'
import {
  REDUX_DATA_RELATIONSHIP_ONE_SET,
  REDUX_DATA_RELATIONSHIP_ONE_DELETE,
  REDUX_DATA_RELATIONSHIP_MANY_CONCAT,
  REDUX_DATA_RELATIONSHIP_MANY_FILTER,
  REDUX_DATA_RELATIONSHIP_MANY_MAP,
  REDUX_DATA_RELATIONSHIP_MANY_PUSH,
  REDUX_DATA_RELATIONSHIP_MANY_REVERSE,
  REDUX_DATA_RELATIONSHIP_MANY_SLICE,
  REDUX_DATA_RELATIONSHIP_MANY_SORT,
  REDUX_DATA_RELATIONSHIP_MANY_SPLICE,
  REDUX_DATA_RELATIONSHIP_MANY_UNSHIFT
} from './relationshipConstants'

// like: concat({ type: 'post', relationship: 'comments', comments: [{ type: 'comment', id: 'comment-id-1' }] })
// like: push({ type: 'post', relationship: 'comments', comment: { type: 'comment', id: 'comment-id-1' } })
// like: push({ type: 'post', relationship: 'comments', comments: [{ type: 'comment', id: 'comment-id-1' }] })
// like: set({ type: 'post', relationship: 'author', author: { type: 'author', id: 'author-id-1' } })

// payload: { type, relationship, [relationship] }
export const set = createAction(REDUX_DATA_RELATIONSHIP_ONE_SET)

// payload: { type, relationship }
export const deleteRelationship = createAction(REDUX_DATA_RELATIONSHIP_ONE_DELETE)

// payload: { type, relationship, [relationships] }
export const concat = createAction(REDUX_DATA_RELATIONSHIP_MANY_CONCAT)

// payload: { type, relationship, filter: func }
export const filter = createAction(REDUX_DATA_RELATIONSHIP_MANY_FILTER)

// payload: { type, relationship, map: func }
export const map = createAction(REDUX_DATA_RELATIONSHIP_MANY_MAP)

// payload: { type, relationship, [relationship] || [relationships] }
export const push = createAction(REDUX_DATA_RELATIONSHIP_MANY_PUSH)

// payload: { type, relationship }
export const reverse = createAction(REDUX_DATA_RELATIONSHIP_MANY_REVERSE)

// payload: { type, relationship }
export const slice = createAction(REDUX_DATA_RELATIONSHIP_MANY_SLICE)

// payload: { type, relationship }
export const sort = createAction(REDUX_DATA_RELATIONSHIP_MANY_SORT)

// payload: { type, relationship }
export const splice = createAction(REDUX_DATA_RELATIONSHIP_MANY_SPLICE)

// payload: { type, relationship }
export const unshift = createAction(REDUX_DATA_RELATIONSHIP_MANY_UNSHIFT)
