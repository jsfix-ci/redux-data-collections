import { createAction } from 'redux-actions'

// TODO: each action should have a "raw" version for acting directly instead of staging changes in the meta
import {
  RELATIONSHIP_RESET,
  RELATIONSHIP_ONE_SET,
  RELATIONSHIP_ONE_DELETE,
  RELATIONSHIP_MANY_DELETE,
  RELATIONSHIP_MANY_CONCAT,
  RELATIONSHIP_MANY_FILTER,
  RELATIONSHIP_MANY_MAP,
  RELATIONSHIP_MANY_PUSH,
  RELATIONSHIP_MANY_REVERSE,
  RELATIONSHIP_MANY_SLICE,
  RELATIONSHIP_MANY_SORT,
  RELATIONSHIP_MANY_SPLICE,
  RELATIONSHIP_MANY_UNSHIFT
} from '../constants/relationshipConstants'

// like: concat({ type: 'post', relationship: 'comments', comments: [{ type: 'comment', id: 'comment-id-1' }] })
// like: push({ type: 'post', relationship: 'comments', comment: { type: 'comment', id: 'comment-id-1' } })
// like: push({ type: 'post', relationship: 'comments', comments: [{ type: 'comment', id: 'comment-id-1' }] })
// like: set({ type: 'post', relationship: 'author', author: { type: 'author', id: 'author-id-1' } })

// payload: { type, relationship, [relationship] }
export const set = createAction(RELATIONSHIP_ONE_SET)

// reset a relationship, one or many
// payload: { type, relationship }
export const reset = createAction(RELATIONSHIP_RESET)

// delete a single relationship
// payload: { type, relationship }
export const deleteOne = createAction(RELATIONSHIP_ONE_DELETE)

// delete a relationship from a many array
// payload: { type, relationship, [relationship] }
export const deleteRelationship = createAction(RELATIONSHIP_MANY_DELETE)

// payload: { type, relationship, [relationships] }
export const concat = createAction(RELATIONSHIP_MANY_CONCAT)

// payload: { type, relationship, filter: func }
export const filter = createAction(RELATIONSHIP_MANY_FILTER)

// payload: { type, relationship, map: func }
export const map = createAction(RELATIONSHIP_MANY_MAP)

// payload: { type, relationship, [relationship] || [relationships] }
export const push = createAction(RELATIONSHIP_MANY_PUSH)

// payload: { type, relationship }
export const reverse = createAction(RELATIONSHIP_MANY_REVERSE)

// payload: { type, relationship }
export const slice = createAction(RELATIONSHIP_MANY_SLICE)

// payload: { type, relationship }
export const sort = createAction(RELATIONSHIP_MANY_SORT)

// payload: { type, relationship }
export const splice = createAction(RELATIONSHIP_MANY_SPLICE)

// payload: { type, relationship }
export const unshift = createAction(RELATIONSHIP_MANY_UNSHIFT)
